
import React from 'react';
import { useGameData } from '../contexts/GameDataContext';
import { DEFAULT_THEME } from '../constants';

const ThemePage: React.FC = () => {
  const { theme } = useGameData();
  //const currentTheme = theme || DEFAULT_THEME; // Fallback to default if somehow null
  const currentTheme = DEFAULT_THEME;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-600 mb-2">
          {currentTheme.gamejamtitle}
        </h1>
        <p className="text-slate-400 text-lg">{currentTheme.gamejamlines}</p>
      </header>

      <div className="bg-slate-800 shadow-xl rounded-lg overflow-hidden">
        <img 
          src={currentTheme.imageUrlOrVideoUrl} 
          alt={currentTheme.title} 
          className="w-full h-64 md:h-96 object-cover" 
        />
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-4">{currentTheme.title}</h2>
          <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
            {currentTheme.description}
          </p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">Suggested Game Types:</h3>
            {currentTheme.gameTypes && currentTheme.gameTypes.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {currentTheme.gameTypes.map((type, index) => (
                  <li 
                    key={index} 
                    className="bg-slate-700 text-cyan-300 text-sm px-3 py-1 rounded-full shadow"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">No specific game types suggested, let your imagination run wild!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
