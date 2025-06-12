
import React from 'react';
import { TeamMember } from '../types';
import { ROLE_COLORS } from '../constants';

interface PixelArtAvatarProps {
  member: TeamMember;
  size?: number;
}

const PixelArtAvatar: React.FC<PixelArtAvatarProps> = ({ member, size = 40 }) => {
  const bgColor = ROLE_COLORS[member.role] || ROLE_COLORS.default;
  const initial = member.name.substring(0, 1).toUpperCase();

  return (
    <div 
      className={`flex items-center justify-center text-white font-bold rounded-sm shadow-md`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        backgroundColor: bgColor.replace('bg-', ''), // Quick way to get hex, ideally ROLE_COLORS store hex
        imageRendering: 'pixelated' 
      }}
      title={`${member.name} (${member.role}, ${member.gender})`}
    >
      <span style={{ fontSize: `${size * 0.5}px` }}>{initial}</span>
    </div>
  );
};
// A more robust way to handle bgColor for style attribute:
// const colorClassToHex: Record<string, string> = {
//   'bg-gray-500': '#6B7280', 'bg-blue-500': '#3B82F6', /* ... add all from ROLE_COLORS */
// };
// style={{ backgroundColor: colorClassToHex[bgColor] || colorClassToHex['bg-gray-500'] }}


export default PixelArtAvatar;
