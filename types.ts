
export interface Theme {
  gamejamtitle: string;
  gamejamlines: string;
  title: string;
  imageUrlOrVideoUrl: string;
  description: string;
  gameTypes: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string; // Tooltip text
  iconUrl: string; // URL for the badge icon
  criteria: string; // Detailed criteria for LLM evaluation & admin view
  isSecret?: boolean; // If true, details are hidden until unlocked
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
  PREFER_NOT_TO_SAY = "Prefer not to say"
}

export interface TeamMember {
  id: string;
  name: string;
  gender: Gender;
  role: string; // e.g., Programmer, Artist, Designer
}

export interface Team {
  id: string;
  name: string;
  passwordHash: string; // Representing a hashed password
  members: TeamMember[];
  pixelArtTeamRepresentation: string; // Could be a serialized config or SVG string
  earnedAchievementIds: string[];
  gameSubmissionText?: string;
}

export interface GameDataContextType {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  achievements: Achievement[];
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (achievement: Achievement) => void;
  getAchievementById: (id: string) => Achievement | undefined;
}

export interface AuthContextType {
  currentTeam: Team | null;
  login: (teamName: string, passwordAttempt: string) => Promise<boolean>;
  logout: () => void;
  register: (teamName: string, passwordRaw: string, members: Omit<TeamMember, 'id'>[]) => Promise<Team | null>;
  updateCurrentTeam: (team: Team) => void;
  teams: Team[]; // For admin or lookup, in a real app this would be backend managed
}

export interface GroundingChunkWeb {
  uri?: string; // Made optional to align with SDK
  title?: string; // Made optional to align with SDK
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // other types of chunks could be defined here
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // other metadata fields
}