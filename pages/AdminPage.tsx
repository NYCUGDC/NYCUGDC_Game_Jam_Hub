
import React, { useState, FormEvent } from 'react';
import { useGameData } from '../contexts/GameDataContext';
import { Theme, Achievement } from '../types';
import { DEFAULT_THEME, INITIAL_ACHIEVEMENTS, PlusCircleIcon } from '../constants';

const AdminPage: React.FC = () => {
  const { theme, setTheme, achievements, addAchievement, updateAchievement } = useGameData();

  // Theme state
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme || DEFAULT_THEME);
  
  // Achievement state
  const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> & { isNew?: boolean }>({ isNew: true, name: '', description: '', iconUrl: '', criteria: '', isSecret: false });
  const [showAchievementForm, setShowAchievementForm] = useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "gameTypes") {
        setCurrentTheme(prev => ({ ...prev, gameTypes: value.split(',').map(s => s.trim()) }));
    } else {
        setCurrentTheme(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleThemeSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTheme(currentTheme);
    alert('Theme updated successfully!');
  };
  
  const handleResetTheme = () => {
    setCurrentTheme(DEFAULT_THEME);
    setTheme(DEFAULT_THEME);
    alert('Theme reset to default.');
  };

  const handleAchievementChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setEditingAchievement(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAchievementSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, description, iconUrl, criteria } = editingAchievement;
    if (!name || !description || !iconUrl || !criteria) {
        alert("All achievement fields (Name, Description, Icon URL, Criteria) are required.");
        return;
    }

    if (editingAchievement.isNew || !editingAchievement.id) {
      addAchievement({ 
        name, 
        description, 
        iconUrl, 
        criteria, 
        isSecret: editingAchievement.isSecret || false 
      });
      alert('Achievement added successfully!');
    } else {
      updateAchievement(editingAchievement as Achievement);
      alert('Achievement updated successfully!');
    }
    setEditingAchievement({ isNew: true, name: '', description: '', iconUrl: '', criteria: '', isSecret: false });
    setShowAchievementForm(false);
  };
  
  const startEditAchievement = (ach: Achievement) => {
    setEditingAchievement({ ...ach, isNew: false });
    setShowAchievementForm(true);
  };
  
  const startNewAchievement = () => {
    setEditingAchievement({ isNew: true, name: '', description: '', iconUrl: '', criteria: '', isSecret: false });
    setShowAchievementForm(true);
  };

  const handleResetAchievements = () => {
    // This is a bit brute-force for a real app. Ideally, a soft delete or proper ID management is needed.
    // For now, it will effectively remove all custom achievements and re-add defaults if the underlying useLocalStorage state is re-initialized with INITIAL_ACHIEVEMENTS.
    // To properly "reset", we might need a dedicated function in GameDataContext to setAchievements(INITIAL_ACHIEVEMENTS)
    INITIAL_ACHIEVEMENTS.forEach(ach => {
        if (!achievements.find(a => a.id === ach.id)) {
            addAchievement(ach); // Add if missing
        } else {
            updateAchievement(ach); // Update if exists
        }
    });
    // Remove achievements not in default (careful with custom IDs)
    // This part is tricky without proper ID comparison logic if IDs can be user-generated AND default.
    // For simplicity, this example just ensures defaults are present/updated.
    alert('Achievements reset to initial set. Custom achievements might still exist if not overwritten by ID.');
  };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-red-400 mb-8">Admin Panel</h1>

      {/* Theme Management */}
      <section className="mb-12 bg-slate-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-sky-400 mb-4">Manage Theme</h2>
        <form onSubmit={handleThemeSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">Title</label>
            <input type="text" name="title" id="title" value={currentTheme.title} onChange={handleThemeChange} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="imageUrlOrVideoUrl" className="block text-sm font-medium text-slate-300">Image/Video URL</label>
            <input type="text" name="imageUrlOrVideoUrl" id="imageUrlOrVideoUrl" value={currentTheme.imageUrlOrVideoUrl} onChange={handleThemeChange} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
            <textarea name="description" id="description" rows={4} value={currentTheme.description} onChange={handleThemeChange} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="gameTypes" className="block text-sm font-medium text-slate-300">Suggested Game Types (comma-separated)</label>
            <input type="text" name="gameTypes" id="gameTypes" value={currentTheme.gameTypes.join(', ')} onChange={handleThemeChange} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">Save Theme</button>
            <button type="button" onClick={handleResetTheme} className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">Reset to Default Theme</button>
          </div>
        </form>
      </section>

      {/* Achievements Management */}
      <section className="bg-slate-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Manage Achievements</h2>
        
        {!showAchievementForm && (
            <button 
                onClick={startNewAchievement}
                className="mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center"
            >
                <PlusCircleIcon className="w-5 h-5 mr-2" /> Add New Achievement
            </button>
        )}

        {showAchievementForm && (
          <form onSubmit={handleAchievementSubmit} className="space-y-4 mb-8 p-4 border border-slate-700 rounded-md bg-slate-800/50">
            <h3 className="text-xl text-cyan-400">{editingAchievement.isNew ? 'Add New' : 'Edit'} Achievement</h3>
            <div>
              <label htmlFor="achName" className="block text-sm font-medium text-slate-300">Name</label>
              <input type="text" name="name" id="achName" value={editingAchievement.name || ''} onChange={handleAchievementChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="achDesc" className="block text-sm font-medium text-slate-300">Description (Tooltip)</label>
              <textarea name="description" id="achDesc" rows={2} value={editingAchievement.description || ''} onChange={handleAchievementChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="achIcon" className="block text-sm font-medium text-slate-300">Icon URL</label>
              <input type="text" name="iconUrl" id="achIcon" value={editingAchievement.iconUrl || ''} onChange={handleAchievementChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="achCriteria" className="block text-sm font-medium text-slate-300">Criteria (for LLM & detailed view)</label>
              <textarea name="criteria" id="achCriteria" rows={3} value={editingAchievement.criteria || ''} onChange={handleAchievementChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
            </div>
            <div className="flex items-center">
                <input type="checkbox" name="isSecret" id="achIsSecret" checked={editingAchievement.isSecret || false} onChange={handleAchievementChange} className="h-4 w-4 text-yellow-600 border-slate-500 rounded focus:ring-yellow-500" />
                <label htmlFor="achIsSecret" className="ml-2 block text-sm text-slate-300">Is Secret? (Details hidden until unlocked)</label>
            </div>
            <div className="flex space-x-3 pt-2">
              <button type="submit" className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">{editingAchievement.isNew ? 'Add' : 'Update'} Achievement</button>
              <button type="button" onClick={() => setShowAchievementForm(false)} className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">Cancel</button>
            </div>
          </form>
        )}

        <div className="space-y-3">
            <h3 className="text-xl text-yellow-300 mb-3">Current Achievements:</h3>
            {achievements.map(ach => (
                <div key={ach.id} className="p-3 bg-slate-700/70 rounded-md flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-slate-200">{ach.name} {ach.isSecret && <span className="text-xs text-orange-400">(Secret)</span>}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2" title={ach.description}>Tooltip: {ach.description}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-3" title={ach.criteria}>Criteria: {ach.criteria}</p>
                    </div>
                    <button 
                        onClick={() => startEditAchievement(ach)}
                        className="text-sm text-cyan-400 hover:text-cyan-300 ml-4 p-1 border border-cyan-500 rounded hover:bg-cyan-500/20 transition-colors"
                    >
                        Edit
                    </button>
                </div>
            ))}
        </div>
         <button 
            type="button" 
            onClick={handleResetAchievements} 
            className="mt-6 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
            Reset to Default Achievements
        </button>
      </section>
    </div>
  );
};

export default AdminPage;
