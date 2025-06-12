
import React from 'react';
import { TeamMember, Gender } from '../types';
import { GENDER_OPTIONS, MinusCircleIcon } from '../constants';

interface TeamMemberFormProps {
  member: Partial<Omit<TeamMember, 'id'>>;
  index: number;
  onMemberChange: (index: number, field: keyof Omit<TeamMember, 'id'>, value: string) => void;
  onRemoveMember: (index: number) => void;
  isOnlyMember?: boolean;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ member, index, onMemberChange, onRemoveMember, isOnlyMember }) => {
  return (
    <div className="p-3 border border-slate-700 rounded-md mb-3 bg-slate-800/50 relative">
      <h4 className="text-sm font-semibold text-cyan-400 mb-2">Member {index + 1}</h4>
      {!isOnlyMember && (
        <button
          type="button"
          onClick={() => onRemoveMember(index)}
          className="absolute top-2 right-2 text-red-400 hover:text-red-300"
          title="Remove Member"
        >
          <MinusCircleIcon className="w-5 h-5" />
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label htmlFor={`memberName-${index}`} className="block text-xs font-medium text-slate-400 mb-1">Name</label>
          <input
            type="text"
            id={`memberName-${index}`}
            value={member.name || ''}
            onChange={(e) => onMemberChange(index, 'name', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-md p-2 text-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Ada Lovelace"
            required
          />
        </div>
        <div>
          <label htmlFor={`memberGender-${index}`} className="block text-xs font-medium text-slate-400 mb-1">Gender</label>
          <select
            id={`memberGender-${index}`}
            value={member.gender || ''}
            onChange={(e) => onMemberChange(index, 'gender', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-slate-200 rounded-md p-2 text-sm focus:ring-cyan-500 focus:border-cyan-500"
            required
          >
            <option value="" disabled>Select gender</option>
            {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`memberRole-${index}`} className="block text-xs font-medium text-slate-400 mb-1">Role</label>
          <input
            type="text"
            id={`memberRole-${index}`}
            value={member.role || ''}
            onChange={(e) => onMemberChange(index, 'role', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-md p-2 text-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Programmer, Artist, etc."
            required
          />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberForm;
