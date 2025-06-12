
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGameData } from '../contexts/GameDataContext';
import TeamPixelArt from '../components/TeamPixelArt';
import AchievementCard from '../components/AchievementCard';
import PixelArtAvatar from '../components/PixelArtAvatar';
import { UserIcon, TrophyIcon } from '../constants';
import { Achievement } from '../types'; // Added import

const TeamDashboardPage: React.FC = () => {
  const { currentTeam } = useAuth();
  const { achievements, getAchievementById } = useGameData(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentTeam) {
      navigate('/auth');
    }
  }, [currentTeam, navigate]);

  if (!currentTeam) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-xl text-slate-400">Loading team data or redirecting...</p>
      </div>
    );
  }

  const earnedAchievementsFull = currentTeam.earnedAchievementIds
    .map(id => getAchievementById(id))
    .filter(ach => ach !== undefined) as Achievement[];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 p-6 bg-slate-800 rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-48 h-auto md:w-64 flex-shrink-0">
             <TeamPixelArt 
                representation={currentTeam.pixelArtTeamRepresentation} 
                teamName={currentTeam.name}
                className="border-2 border-cyan-500 rounded-lg min-h-[128px]" // Ensure a min height for consistency
              />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500 mb-2">
              Team: {currentTeam.name}
            </h1>
            <p className="text-slate-400 text-lg">Welcome to your Game Jam Dashboard!</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Members Section */}
        <section className="lg:col-span-1 bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-sky-400 mb-4 flex items-center">
            <UserIcon className="w-7 h-7 mr-2 text-sky-500" />
            Team Members
          </h2>
          {currentTeam.members.length > 0 ? (
            <ul className="space-y-4">
              {currentTeam.members.map(member => (
                <li key={member.id} className="flex items-center p-3 bg-slate-700/50 rounded-md shadow">
                  <PixelArtAvatar member={member} size={32} />
                  <div className="ml-3">
                    <p className="font-medium text-slate-200">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.role} ({member.gender})</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No members in this team.</p>
          )}
        </section>

        {/* Earned Achievements Section */}
        <section className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6 flex items-center">
            <TrophyIcon className="w-7 h-7 mr-2 text-yellow-500" />
            Earned Achievements
          </h2>
          {earnedAchievementsFull.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {earnedAchievementsFull.map(ach => (
                <AchievementCard key={ach.id} achievement={ach} isUnlocked={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-slate-500">No achievements earned yet. Keep jamming!</p>
              <p className="text-sm text-slate-600 mt-2">Head over to the Submit page when your game is ready.</p>
            </div>
          )}
        </section>
      </div>
       {currentTeam.gameSubmissionText && (
        <section className="mt-8 bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">
            Latest Game Submission
          </h2>
          <div className="bg-slate-700/50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-slate-300 mb-2">Game Description:</h3>
            <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono bg-slate-900/30 p-3 rounded">{currentTeam.gameSubmissionText}</pre>
          </div>
        </section>
      )}
    </div>
  );
};

export default TeamDashboardPage;