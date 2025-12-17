
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Achievement, GroundingMetadata } from '../types';
import { GEMINI_API_MODEL_TEXT, GEMINI_API_MODEL_IMAGE } from '../constants';

const API_KEY = process.env.GEMINI_API_KEY;
const OpenAI_API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" });

export interface AchievementEvaluationResult {
  achievedIds: string[];
  reasoning?: string; // Optional: Model's reasoning
  error?: string;
}

export const evaluateAchievementsWithGemini = async (
  gameDescription: string,
  achievements: Achievement[]
): Promise<AchievementEvaluationResult> => {
  if (!API_KEY) {
    return { achievedIds: [], error: "API Key not configured." };
  }

  const achievementPrompts = achievements.map(ach => ({
    id: ach.id,
    name: ach.name,
    criteria: ach.criteria,
  }));

  const prompt = `
    You are an expert game jam judge. Evaluate the provided game description against a list of achievement criteria.
    The game description is as follows:
    ---
    ${gameDescription}
    ---

    The available achievements are:
    ---
    ${JSON.stringify(achievementPrompts, null, 2)}
    ---

    Based ONLY on the game description provided, determine which of these achievements are clearly met.
    Respond with a JSON object containing a single key "achieved_ids", which should be an array of strings representing the IDs of the achievements met.
    For example: {"achieved_ids": ["innovator", "narrative-weaver"]}
    If no achievements are met, return {"achieved_ids": []}.
    Do not include any achievements that are only partially met or require assumptions beyond the provided text.
  `;

  try {
    
    console.log(prompt);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_API_MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // Low temperature for more deterministic output
      }
    });
    console.log(response.text);
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsed = JSON.parse(jsonStr);

    if (parsed && Array.isArray(parsed.achieved_ids)) {
      // Validate that IDs returned are actual achievement IDs
      const validAchievedIds = parsed.achieved_ids.filter((id: string) => 
        achievements.some(ach => ach.id === id)
      );
      return { achievedIds: validAchievedIds };
    } else {
      console.error("Unexpected JSON structure from Gemini:", parsed);
      return { achievedIds: [], error: "Unexpected response structure from AI." };
    }
  } catch (error) {
    console.error("Error evaluating achievements with Gemini:", error);
    return { achievedIds: [], error: `AI evaluation failed: ${error instanceof Error ? error.message : String(error)}` };
  }
};


export const generateTextWithGoogleSearch = async (
  promptText: string
): Promise<{ text: string; groundingMetadata?: GroundingMetadata; error?: string }> => {
  if (!API_KEY) {
    return { text: "", error: "API Key not configured." };
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_API_MODEL_TEXT,
      contents: promptText,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata,
    };
  } catch (error) {
    console.error("Error generating text with Google Search:", error);
    return { text: "", error: `AI generation failed: ${error instanceof Error ? error.message : String(error)}` };
  }
};

// export const generatePixelArtImage = async (prompt: string): Promise<string | null> => {
//   if (!API_KEY) {
//     console.error("API Key not configured for image generation.");
//     return null;
//   }

//   try {
//     const response = await ai.models.generateImages({
//       model: GEMINI_API_MODEL_IMAGE,
//       prompt: prompt,
//       config: { numberOfImages: 1, outputMimeType: 'image/png' },
//     });

//     if (response.generatedImages && response.generatedImages.length > 0) {
//       const base64ImageBytes = response.generatedImages[0].image.imageBytes;
//       return `data:image/png;base64,${base64ImageBytes}`;
//     }
//     console.error("No images generated or unexpected response structure:", response);
//     return null;
//   } catch (error) {
//     console.error("Error generating pixel art image with Gemini:", error);
//     return null;
//   }
// };

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OpenAI_API_KEY,
  dangerouslyAllowBrowser: true, // ⚠️ 僅限開發使用，不建議部署
});


export const generatePixelArtImage = async (prompt: string): Promise<string | null> => {
  console.log(prompt);
  try {
    const response = await openai.images.generate({
      model: "dall-e-3", // ✅ 比較省錢的圖像生成模型
      prompt: prompt,
      n: 1,
      size: "1024x1024",   // ✅ 成本效益佳，適合 pixel art
      response_format: "url",
    });

    return response.data[0]?.url ?? null;
  } catch (error: any) {
    console.error("Error generating image with OpenAI:", error);
    return null;
  }
};
