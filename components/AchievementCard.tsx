
import React from 'react';
import { Achievement } from '../types';
import Tooltip from './Tooltip';
import { COVERED_ACHIEVEMENT_ICON_URL, TrophyIcon } from '../constants';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, isUnlocked }) => {
  const iconToShow = isUnlocked ? achievement.iconUrl : COVERED_ACHIEVEMENT_ICON_URL;
  const nameToShow = isUnlocked || !achievement.isSecret ? achievement.name : "Secret Achievement";
  const descriptionToShow = isUnlocked || !achievement.isSecret ? achievement.description : "Unlock this achievement to reveal its details!";

  return (
    <div className={`p-4 rounded-lg shadow-lg transition-all duration-300 ${isUnlocked ? 'bg-slate-700 border-2 border-yellow-400' : 'bg-slate-800 border border-slate-600'}`}>
      <Tooltip text={descriptionToShow} position="top">
        <div className="flex flex-col items-center text-center">
          <img 
            src={iconToShow} 
            alt={nameToShow} 
            className={`w-24 h-24 rounded-full object-cover mb-3 ${!isUnlocked && !achievement.isSecret ? 'opacity-60 grayscale' : ''} ${isUnlocked ? 'ring-2 ring-yellow-400' : ''}`}
            onError={(e) => (e.currentTarget.src = COVERED_ACHIEVEMENT_ICON_URL)} // Fallback if image fails
          />
          <h3 className={`font-semibold text-lg ${isUnlocked ? 'text-yellow-300' : 'text-slate-300'}`}>
            {nameToShow}
          </h3>
          {isUnlocked && achievement.isSecret && (
             <p className="text-xs text-slate-400 mt-1">({achievement.name})</p>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default AchievementCard;
