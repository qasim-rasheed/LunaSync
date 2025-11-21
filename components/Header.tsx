import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onReset }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    onReset(); // Clear user data
    navigate('/'); // Ensure navigation to home
  };

  return (
    <header className="sticky top-4 z-50 px-4 md:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg shadow-gray-200/20 dark:shadow-black/20 border border-white/60 dark:border-gray-700 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 transition-all duration-300 hover:shadow-xl">
          
          {/* Clickable Logo Area */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Go to Home and Reset"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
               {/* Animated Background Blob */}
               <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-violet-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-20 group-hover:opacity-100 blur-sm group-hover:blur-none"></div>
               
               {/* Icon Container */}
               <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                 <Sparkles className="text-white w-5 h-5" />
               </div>
            </div>
            
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 group-hover:from-pink-500 group-hover:to-violet-500 transition-all duration-300">
                LunaSync
              </span>
              <span className="text-[10px] font-medium text-gray-400 tracking-widest uppercase group-hover:text-pink-400 transition-colors">
                Cycle Planner
              </span>
            </div>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};