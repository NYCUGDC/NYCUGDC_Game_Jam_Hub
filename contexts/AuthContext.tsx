
import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { Team, AuthContextType, TeamMember } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { generatePixelArtImage } from '../services/geminiService';

// SUPER simple "hash" for demo purposes. DO NOT USE IN PRODUCTION.
const simpleHash = (password: string): string => {
  return `hashed_${password.split('').reverse().join('')}_${password.length}`;
};

const generateTeamPixelArtDataUri = async (teamName: string, members: TeamMember[]): Promise<string> => {
  const roles = members.map(m => m.role).filter((value, index, self) => self.indexOf(value) === index); // Unique roles
  const prompt = `A fun and vibrant pixel art representation of a game development team named '${teamName}'. The team has ${members.length} members. Key skills or roles in the team include ${roles.join(', ') || 'various talents'}. Style: retro, colorful, 16-bit era game sprites or icons. Make it cool and representative of game development energy. Ensure the output is a pixel art image.`;
  
  try {
    const imageDataUri = await generatePixelArtImage(prompt);
    return imageDataUri || ""; // Return empty string on failure, TeamPixelArt component will handle fallback
  } catch (error) {
    console.error("Failed to generate team pixel art:", error);
    return ""; // Return empty string on failure
  }
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useLocalStorage<Team[]>('gameJamTeams', []);
  const [currentTeamId, setCurrentTeamId] = useLocalStorage<string | null>('gameJamCurrentTeamId', null);

  const currentTeam = useMemo(() => {
    if (!currentTeamId || !teams) return null;
    return teams.find(t => t.id === currentTeamId) || null;
  }, [currentTeamId, teams]);

  const login = useCallback(async (teamName: string, passwordAttempt: string): Promise<boolean> => {
    const team = teams.find(t => t.name === teamName);
    if (team && team.passwordHash === simpleHash(passwordAttempt)) {
      setCurrentTeamId(team.id);
      return true;
    }
    return false;
  }, [teams, setCurrentTeamId]);

  const logout = useCallback(() => {
    setCurrentTeamId(null);
  }, [setCurrentTeamId]);

  const register = useCallback(async (
    teamName: string, 
    passwordRaw: string, 
    membersData: Omit<TeamMember, 'id'>[],
    autoGenerateAvatar: boolean // New parameter
  ): Promise<Team | null> => {
    if (teams.some(t => t.name === teamName)) {
      throw new Error("Team name already exists.");
    }
    const newMembers: TeamMember[] = membersData.map((m, index) => ({
      ...m,
      id: `member-${Date.now()}-${index}`
    }));

    //const pixelArtRepresentation = await generateTeamPixelArtDataUri(teamName, newMembers);
    let pixelArtRepresentation: string;
    if (autoGenerateAvatar) {
      pixelArtRepresentation = await generateTeamPixelArtDataUri(teamName, newMembers);
    } else {
      const seed = teamName.replace(/\s+/g, '-').toLowerCase(); // Create a seed from team name
      pixelArtRepresentation = `https://picsum.photos/seed/${seed}/400/300`; // Placeholder image URL
    }

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: teamName,
      passwordHash: simpleHash(passwordRaw),
      members: newMembers,
      pixelArtTeamRepresentation: pixelArtRepresentation,
      earnedAchievementIds: [],
      gameSubmissions: [], // Initialize gameSubmissionText
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
    setCurrentTeamId(newTeam.id); // Auto-login after registration
    return newTeam;
  }, [teams, setTeams, setCurrentTeamId]);
  
  const updateCurrentTeam = useCallback((updatedTeam: Team) => {
    // This function now updates the team in the central 'teams' array.
    // The 'currentTeam' derived state will automatically reflect this change.
    setTeams(prevTeams => prevTeams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
    // No need to setCurrentTeamId if it's not changing. If ID could change, that's a different scenario.
  }, [setTeams]);


  return (
    <AuthContext.Provider value={{ currentTeam, login, logout, register, updateCurrentTeam, teams }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
