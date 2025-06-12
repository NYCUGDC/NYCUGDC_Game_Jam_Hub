
import React, { createContext, useContext, ReactNode } from 'react';
import { Theme, Achievement, GameDataContextType } from '../types';
import { DEFAULT_THEME, INITIAL_ACHIEVEMENTS } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export const GameDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme | null>('gameJamTheme', DEFAULT_THEME);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('gameJamAchievements', INITIAL_ACHIEVEMENTS);

  const addAchievement = (achievementData: Omit<Achievement, 'id'>) => {
    const newAchievement: Achievement = {
      ...achievementData,
      id: `${achievementData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`, // Simple ID generation
    };
    setAchievements(prev => [...prev, newAchievement]);
  };

  const updateAchievement = (updatedAchievement: Achievement) => {
    setAchievements(prev => 
      prev.map(ach => ach.id === updatedAchievement.id ? updatedAchievement : ach)
    );
  };
  
  const getAchievementById = (id: string): Achievement | undefined => {
    return achievements.find(ach => ach.id === id);
  };

  return (
    <GameDataContext.Provider value={{ theme, setTheme, achievements, addAchievement, updateAchievement, getAchievementById }}>
      {children}
    </GameDataContext.Provider>
  );
};

export const useGameData = (): GameDataContextType => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};
