
import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGameData } from '../contexts/GameDataContext';
import { evaluateAchievementsWithGemini, AchievementEvaluationResult } from '../services/geminiService';
import { GameSubmission } from '../types'; // Import GameSubmission
import { ArrowPathIcon } from '../constants';

const SubmissionPage: React.FC = () => {
  const { currentTeam, updateCurrentTeam } = useAuth();
  const { achievements } = useGameData();
  const navigate = useNavigate();

  const getLatestSubmissionDescription = () => {
    if (currentTeam && currentTeam.gameSubmissions && currentTeam.gameSubmissions.length > 0) {
      return currentTeam.gameSubmissions[currentTeam.gameSubmissions.length - 1].description;
    }
    return '';
  };

  const [gameDescription, setGameDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<AchievementEvaluationResult | null>(null);

  useEffect(() => {
    if (!currentTeam) {
      navigate('/auth');
    } else {
        setGameDescription(getLatestSubmissionDescription());
    }
  }, [currentTeam, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentTeam || !gameDescription.trim()) {
      setError('Game description cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEvaluationResult(null);

    try {
      const result = await evaluateAchievementsWithGemini(gameDescription, achievements);
      setEvaluationResult(result);

      if (result.error) {
        setError(result.error);
      } else {
        const newSubmission: GameSubmission = {
          timestamp: Date.now(),
          description: gameDescription,
          evaluatedAchievementIds: result.achievedIds,
        };
        const updatedTeam = { 
          ...currentTeam, 
          // Merge and deduplicate overall earned achievements
          earnedAchievementIds: [...new Set([...currentTeam.earnedAchievementIds, ...result.achievedIds])], 
          // Add new submission to history
          gameSubmissions: [...currentTeam.gameSubmissions, newSubmission],
        };
        updateCurrentTeam(updatedTeam);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during submission.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!currentTeam) return null; // Or a loading/redirect message

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
          Submit Your Game
        </h1>
        <p className="text-slate-400 text-lg">Share your masterpiece and see what achievements you've unlocked!</p>
      </header>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-slate-800 p-6 md:p-8 rounded-lg shadow-xl">
        <div className="mb-6">
          <label htmlFor="gameDescription" className="block text-xl font-semibold text-slate-300 mb-2">
            Game Description (作品設定.txt)
          </label>
          <p className="text-sm text-slate-400 mb-3">
            Provide a detailed description of your game. The more information you give about its mechanics, story, art style, sound, etc., the better the AI can evaluate your achievements.
            Your latest submission text is pre-filled below.
          </p>
          <textarea
            id="gameDescription"
            rows={10}
            className="w-full bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-md p-3 text-sm focus:ring-green-500 focus:border-green-500 shadow-inner"
            placeholder="Describe your game's theme, gameplay, unique features, narrative, art style, sound design, and how it relates to the Game Jam theme..."
            value={gameDescription}
            onChange={(e) => setGameDescription(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="my-4 p-3 bg-red-900/50 text-red-300 rounded-md text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-150 ease-in-out disabled:bg-slate-600 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
              Evaluating...
            </>
          ) : (
            'Submit & Evaluate Achievements'
          )}
        </button>
      </form>

      {evaluationResult && !evaluationResult.error && (
        <div className="mt-8 max-w-2xl mx-auto bg-slate-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Evaluation Complete!</h2>
          {evaluationResult.achievedIds.length > 0 ? (
            <>
              <p className="text-slate-300 mb-3">Congratulations! Your submission unlocked the following achievements:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-200">
                {evaluationResult.achievedIds.map(id => {
                  const ach = achievements.find(a => a.id === id);
                  return <li key={id}>{ach ? ach.name : id}</li>;
                })}
              </ul>
              <p className="text-sm text-slate-400 mt-4">Visit your Team Page to see all your earned badges.</p>
            </>
          ) : (
            <p className="text-slate-300">
              No new achievements were automatically unlocked based on your description.
              Make sure your description clearly outlines how your game meets specific achievement criteria. You can update your description and resubmit.
            </p>
          )}
          {evaluationResult.reasoning && (
             <div className="mt-4 p-3 bg-slate-700/50 rounded">
                <h4 className="font-semibold text-slate-400 text-sm">AI Reasoning (if provided):</h4>
                <p className="text-xs text-slate-500 whitespace-pre-wrap">{evaluationResult.reasoning}</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionPage;
