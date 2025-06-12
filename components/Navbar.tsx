
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME, UserIcon, TrophyIcon, Cog6ToothIcon } from '../constants';

const Navbar: React.FC = () => {
  const { currentTeam, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-800 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
          {APP_NAME}
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/theme" className="text-slate-300 hover:text-white transition-colors">Theme</Link>
          <Link to="/achievements" className="text-slate-300 hover:text-white transition-colors">Achievements</Link>
          <Link to="/all-teams" className="text-slate-300 hover:text-white transition-colors">All Teams</Link> {/* New link */}
          {currentTeam ? (
            <>
              <Link to="/team" className="text-slate-300 hover:text-white transition-colors">My Team</Link>
              <Link to="/submit" className="text-slate-300 hover:text-white transition-colors">Submit</Link>
              <span className="text-slate-400">|</span>
              <span className="text-green-400 flex items-center">
                <UserIcon className="w-5 h-5 mr-1" />
                {currentTeam.name}
              </span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors">
              Login / Register
            </Link>
          )}
           <Link to="/admin" className="text-slate-300 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700" title="Admin Panel">
             <Cog6ToothIcon className="w-6 h-6" />
           </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
