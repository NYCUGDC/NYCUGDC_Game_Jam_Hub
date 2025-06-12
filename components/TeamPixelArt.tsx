
import React from 'react';

interface TeamPixelArtProps {
  representation: string; // base64 data URI or empty string
  className?: string;
  teamName?: string; // Optional: for alt text
}

const TeamPixelArt: React.FC<TeamPixelArtProps> = ({ representation, className, teamName = "Team" }) => {
  if (!representation) {
    return (
      <div 
        className={`w-full h-32 bg-slate-700 flex items-center justify-center text-slate-400 rounded-md shadow-inner ${className}`}
        aria-label={`${teamName} art not available`}
      >
        No Team Art Available
      </div>
    );
  }

  return (
    <div 
      className={`p-1 bg-slate-700 rounded-md shadow-inner overflow-hidden flex items-center justify-center ${className}`}
      style={{ imageRendering: 'pixelated' }} // Ensure pixelated rendering for upscaled images
    >
      <img 
        src={representation} 
        alt={`${teamName} Pixel Art Representation`} 
        className="max-w-full max-h-full object-contain" // Ensures image fits without distortion
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default TeamPixelArt;