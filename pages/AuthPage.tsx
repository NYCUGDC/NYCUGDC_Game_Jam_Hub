
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TeamMember, Gender } from '../types';
import TeamMemberForm from '../components/TeamMemberForm';
import { EyeIcon, EyeSlashIcon, PlusCircleIcon, UserIcon, LockClosedIcon } from '../constants';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Login state
  const [loginTeamName, setLoginTeamName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Registration state
  const [regTeamName, setRegTeamName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [members, setMembers] = useState<Partial<Omit<TeamMember, 'id'>>[]>([{ name: '', gender: undefined, role: '' }]);
  const [autoGenerateAvatar, setAutoGenerateAvatar] = useState(false); // New state for toggle
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const success = await login(loginTeamName, loginPassword);
      if (success) {
        navigate('/team');
      } else {
        setError('Invalid team name or password.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (members.some(m => !m.name || !m.gender || !m.role)) {
      setError('All member fields are required.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const registeredTeam = await register(
        regTeamName, 
        regPassword, 
        members as Omit<TeamMember, 'id'>[],
        autoGenerateAvatar // Pass toggle state
      );
      if (registeredTeam) {
        navigate('/team');
      } else {
         setError('Registration failed. The team name might already exist or another issue occurred.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const addMember = () => {
    setMembers([...members, { name: '', gender: undefined, role: '' }]);
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleMemberChange = (index: number, field: keyof Omit<TeamMember, 'id'>, value: string) => {
    const newMembers = [...members];
    if (field === 'gender') {
       newMembers[index][field] = value as Gender;
    } else {
       newMembers[index][field] = value;
    }
    setMembers(newMembers);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 md:p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-cyan-400">
            {isLogin ? 'Welcome Back, Jammer!' : 'Join the Jam!'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            {isLogin ? 'Login to your team account.' : 'Create a new team to participate.'}
          </p>
        </div>

        {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm text-center">{error}</p>}

        {isLogin ? (
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="login-team-name" className="block text-sm font-medium text-slate-300">Team Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="login-team-name"
                  name="teamName"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-600 rounded-md placeholder-slate-500 text-slate-200 bg-slate-700 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="The Pixel Pioneers"
                  value={loginTeamName}
                  onChange={(e) => setLoginTeamName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type={showLoginPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-600 rounded-md placeholder-slate-500 text-slate-200 bg-slate-700 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Your super secret password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300">
                  {showLoginPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-500 transition-colors"
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </div>
          </form>
        ) : (
          // Registration Form
          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="reg-team-name" className="block text-sm font-medium text-slate-300">Team Name</label>
               <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input id="reg-team-name" name="teamName" type="text" required 
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-600 rounded-md placeholder-slate-500 text-slate-200 bg-slate-700 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="The Creative Crew"
                  value={regTeamName} onChange={(e) => setRegTeamName(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input id="reg-password" name="password" type={showRegPassword ? "text" : "password"} required 
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-600 rounded-md placeholder-slate-500 text-slate-200 bg-slate-700 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Choose a strong password"
                  value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                <button type="button" onClick={() => setShowRegPassword(!showRegPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300">
                  {showRegPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="reg-confirm-password" className="block text-sm font-medium text-slate-300">Confirm Password</label>
               <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input id="reg-confirm-password" name="confirmPassword" type={showRegConfirmPassword ? "text" : "password"} required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-600 rounded-md placeholder-slate-500 text-slate-200 bg-slate-700 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Confirm your password"
                  value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} />
                <button type="button" onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300">
                  {showRegConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="my-5"> {/* Adjusted margin for spacing */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-slate-300">自動生成小組頭像 (Auto-generate team avatar?)</span>
                <label htmlFor="autoGenerateAvatarToggle" className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="autoGenerateAvatarToggle"
                    className="sr-only peer"
                    checked={autoGenerateAvatar}
                    onChange={() => setAutoGenerateAvatar(!autoGenerateAvatar)}
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-slate-800 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-slate-300">Team Members</h3>
              {members.map((member, index) => (
                <TeamMemberForm
                  key={index}
                  index={index}
                  member={member}
                  onMemberChange={handleMemberChange}
                  onRemoveMember={removeMember}
                  isOnlyMember={members.length === 1}
                />
              ))}
              <button
                type="button"
                onClick={addMember}
                className="w-full flex items-center justify-center text-sm text-cyan-400 hover:text-cyan-300 border-2 border-dashed border-slate-600 hover:border-slate-500 rounded-md py-2 transition-colors"
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" /> Add Member
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 disabled:bg-slate-500 transition-colors"
              >
                {loading ? 'Registering...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <div className="text-sm text-center">
          <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="font-medium text-cyan-500 hover:text-cyan-400">
            {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
