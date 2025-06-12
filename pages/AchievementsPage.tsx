
import React from 'react';
import { useGameData } from '../contexts/GameDataContext';
import { useAuth } from '../contexts/AuthContext';
import AchievementCard from '../components/AchievementCard';
import { TrophyIcon } from '../constants';

const AchievementsPage: React.FC = () => {
  const { achievements } = useGameData();
  const { currentTeam } = useAuth();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-2 flex items-center justify-center">
          <TrophyIcon className="w-10 h-10 mr-3 text-yellow-500" />
          Available Achievements
        </h1>
        <p className="text-slate-400 text-lg">Complete these challenges to earn glory (and cool badges)!</p>
      </header>

      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {achievements.map(ach => (
            <AchievementCard 
              key={ach.id} 
              achievement={ach} 
              isUnlocked={currentTeam?.earnedAchievementIds.includes(ach.id) || false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-slate-500">No achievements have been set up yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
