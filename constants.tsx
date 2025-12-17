
import React from 'react';
import { Theme, Achievement, Gender } from './types';

export const APP_NAME = "NYCU GDC Game Jam";

export const DEFAULT_THEME: Theme = {
  gamejamtitle: "NYCU GDC Game Jam 第0屆",
  gamejamlines: "👾Fun to Play, Play to Live, Live for Fun👾",
  title: "Italian Brainrot",
  imageUrlOrVideoUrl: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0084fe9e-fb0e-4b2b-bfb2-240cac407262_768x455.webp",
  description: "一系列由 AI 合成、造型詭異的動物角色，配上魔性義大利語配音內容。\n「Brain rot」，中文翻譯為「腦腐」，意指「因消費低品質、低價值的瑣碎內容後而造成的負面影響」，普遍用來描述現代人因過度使用社群媒體與網路所帶來的精神與智商腐化傷害。\nAI 生成技術，以及超現實主義的視覺風格，而這兩大元素代表著「後諷刺幽默」（post-ironic humor），「我知道這很蠢，但我就是認真愛它」。",
  gameTypes: ["語音遊戲", "合成遊戲", "猜謎接龍", "..."]
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "設計類1",
    name: "🤌Controllo Spaghetti Aerei",
    description: "用除了Mouse、Touch與keyBoard以外為輸入",
    iconUrl: "https://cdn-crossing.cw.com.tw/ckeditor/201908/ckeditor-5d68888d647b0.jpg", // Placeholder
    criteria: "用除了Mouse、Touch與keyBoard以外為輸入",
  },
  {
    id: "設計類2",
    name: "開始即結束",
    description: "遊戲正式開始時就結束了: 遊戲就在開始前/設定時/…",
    iconUrl: "https://p2.bahamut.com.tw/HOME/creationCover/28/0005825928_B.JPG", // Placeholder
    criteria: "遊戲正式開始時就結束了: 遊戲就在開始前/設定時/…",
  },
  {
    id: "設計類3",
    name: "Wizard of Oz",
    description: "幕後模擬系統反應、不必建造實際可以運作的系統",
    iconUrl: "https://i.cbc.ca/1.5258293.1726857574!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/the-wizard-of-oz-1939.jpg?im=Resize%3D780", // Placeholder
    criteria: "幕後模擬系統反應、不必建造實際可以運作的系統",
  },
  {
    id: "設計類4",
    name: "哦~痛苦",
    description: "畫面不能與landscape夾角小於30度",
    iconUrl: "https://media.nownews.com/nn_media/thumbnail/2022/04/1649570866560-a0e42b41685148809ac6ab0d478a2a88-800x533.jpg?unShow=false", // Placeholder
    criteria: "畫面不能與landscape夾角小於30度(也就是可能會歪頭玩遊戲、畫面是歪的等等)",
  },
  {
    id: "程式類1",
    name: "是Rust? 還是Rust?",
    description: "使用Rust語言、或開發類Rust遊戲",
    iconUrl: "https://files.facepunch.com/lewis/1b0711b110/gesture-header.jpg", // Placeholder
    criteria: "使用Rust語言、或開發類Rust遊戲",
  },
  {
    id: "程式類2",
    name: "遊戲縫合怪",
    description: "Genre差距大、或使用兩種以上引擎或語言開發",
    iconUrl: "https://static.wixstatic.com/media/f8429d_3df100904bdd4bf3b973de3e580b8dc6~mv2.png/v1/fill/w_560,h_318,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.png", // Placeholder
    criteria: "遊戲內Genre差距大(例如：遊戲風格與玩法截然不同)、或使用兩種以上引擎或語言開發",
  },
  {
    id: "美術類1",
    name: "所以...看板娘叫甚麼?",
    description: "使用GDC看板娘製作",
    iconUrl: "https://i.ibb.co/N6NtQfz9/icon.png", // Placeholder
    criteria: "使用GDC看板娘製作",
  },
  {
    id: "美術類2",
    name: "宮老大：「🤬🤬🤬」",
    description: "美術皆用吉卜力風格",
    iconUrl: "https://i.ibb.co/0yHxMBLx/GDC-Game-Jam.png", // Placeholder
    criteria: "美術皆用吉卜力風格",
  },
  {
    id: "美術類3",
    name: "簡單就是美",
    description: "只能用引擎預設mesh",
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rYIhqaOSYQSoefARM49bR4TaePBoUREQMA&s", // Placeholder
    criteria: "只能用引擎預設mesh",
  },
  {
    id: "美術類4",
    name: "嗨~~~ 露比醬",
    description: "換臉相關、或使用露比醬相關資源",
    iconUrl: "https://media.nownews.com/nn_media/thumbnail/2025/04/1744379096764-9ba4dd2677d84e3c818c9b2fbb3d4dcb-800x450.webp?unShow=false", // Placeholder
    criteria: "換臉相關、或使用露比醬相關資源",
  },
  {
    id: "音效類1",
    name: "那一天的猶豫猶豫起來",
    description: "所有純音效都要用「中文字」發聲製作",
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeIx0ZE6pxEx9Rh9iP6Ydzzib_IMxqqC1c4Q&s", // Placeholder
    criteria: "所有純音效都要用「中文字」發聲製作",
  },
  {
    id: "音效類2",
    name: "你到底在供三...",
    description: "只用一個音效去製作整個遊戲，可後處理",
    iconUrl: "https://truth.bahamut.com.tw/s01/202408/f41d1e4f6ed6766648e89ebeb22a3d3a.JPG", // Placeholder
    criteria: "只用一個音效去製作整個遊戲，可後處理",
  },
  {
    id: "音效類3",
    name: "Ɯ𝕴ᖈᖈ𝕺ᖈ",
    description: "發明一個語系、發音部分，不一定要文字",
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLTX9U8il2WrgXwZ-SCxvRtjg3T4xlxgOunw&s", // Placeholder
    criteria: "發明一個語系、發音部分，不一定要文字",
  },
  {
    id: "作息類1",
    name: "健康作息大師",
    description: "成員皆睡滿8小時、一天吃滿三餐",
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_JYsPXzr9lcsfh_OpvAc616kp9CgIiA37lw&s", // Placeholder
    criteria: "成員皆睡滿8小時、一天吃滿三餐",
  },
];

export const GEMINI_API_MODEL_TEXT = "gemini-2.5-flash-preview-04-17";
export const GEMINI_API_MODEL_IMAGE = "imagen-3.0-generate-002";

export const COVERED_ACHIEVEMENT_ICON_URL = "https://picsum.photos/seed/covered/100/100"; // Placeholder for covered achievement

export const ROLE_COLORS: Record<string, string> = {
  default: 'bg-gray-500', // Used for PixelArtAvatar if role color not found
  Programmer: 'bg-blue-500',
  Artist: 'bg-green-500',
  Designer: 'bg-yellow-500',
  Musician: 'bg-purple-500',
  Writer: 'bg-indigo-500',
};

export const GENDER_OPTIONS = [Gender.MALE, Gender.FEMALE, Gender.OTHER, Gender.PREFER_NOT_TO_SAY];

export const UserIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A18.732 18.732 0 0 1 12 22.5c-2.786 0-5.433-.608-7.499-1.688Z" />
  </svg>
);

export const LockClosedIcon = (props: { className?: string }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export const EyeIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const EyeSlashIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

export const ArrowPathIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const PlusCircleIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const MinusCircleIcon = (props: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
);

export const TrophyIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 0 3-3V8.25a3 3 0 0 0-3-3h-3m6 13.5v-1.5c0-.621-.504-1.125-1.125-1.125H12M9 18.75a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h3M3.75 18.75v-1.5c0-.621.504-1.125 1.125-1.125H9" />
  </svg>
);

export const Cog6ToothIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-.962a8.25 8.25 0 0 1 4.59 4.59c.04.55-.422 1.02-.962 1.11m-4.59-4.59L9.594 3.94m4.59 4.59 1.586-1.586m0 0L21 21M5.026 15.75A8.225 8.225 0 0 1 3 12c0-1.75.53-3.385 1.406-4.744M18.974 8.25A8.225 8.225 0 0 1 21 12c0 1.75-.53 3.385-1.406 4.744m0 0l-1.586 1.586m-1.586-1.586L12 12m0 0L9.594 9.594m2.406 2.406L14.406 14.406M12 12l2.406-2.406M12 12l-2.406 2.406M12 12L9.594 9.594M12 12l2.406-2.406" />
</svg>
);