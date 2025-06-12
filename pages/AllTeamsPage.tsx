
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGameData } from '../contexts/GameDataContext';
import TeamPixelArt from '../components/TeamPixelArt';
import { Team } from '../types';
import { TrophyIcon, UserIcon } from '../constants';

const AllTeamsPage: React.FC = () => {
  const { teams } = useAuth();
  const { getAchievementById } = useGameData();

  if (!teams || teams.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-6">
          All Registered Teams
        </h1>
        <p className="text-xl text-slate-500">No teams have registered yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-2 flex items-center justify-center">
           <UserIcon className="w-10 h-10 mr-3 text-sky-500" />
          All Registered Teams
        </h1>
        <p className="text-slate-400 text-lg">See all participants and their accomplishments.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team: Team) => {
          const earnedAchievementNames = team.earnedAchievementIds
            .map(id => {
              const achievement = getAchievementById(id);
              return achievement ? achievement.name : null;
            })
            .filter(name => name !== null) as string[];

          return (
            <div key={team.id} className="bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3 truncate" title={team.name}>
                {team.name}
              </h2>
              <div className="w-full h-32 mb-4 bg-slate-700/50 rounded flex items-center justify-center overflow-hidden">
                <TeamPixelArt 
                  representation={team.pixelArtTeamRepresentation} 
                  teamName={team.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-md font-medium text-yellow-400 mb-2 flex items-center">
                  <TrophyIcon className="w-5 h-5 mr-2 text-yellow-500" />
                  Earned Achievements:
                </h3>
                {earnedAchievementNames.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {earnedAchievementNames.map((name, index) => (
                      <li key={index} className="text-slate-300 text-sm">
                        {name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 text-sm">No achievements earned yet.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTeamsPage;
