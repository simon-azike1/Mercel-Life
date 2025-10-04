import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center 
        w-12 h-12 rounded-xl
        transition-all duration-300 transform hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-green-500/20
        ${isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-200'
        }
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <Sun 
          className={`
            absolute inset-0 w-6 h-6 
            transition-all duration-500 transform 
            ${isDarkMode 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
            }
          `}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`
            absolute inset-0 w-6 h-6 
            transition-all duration-500 transform 
            ${isDarkMode 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
            }
          `}
        />
      </div>
      
      {/* Glow Effect */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-300 
        ${isDarkMode ? 'bg-yellow-400/5' : 'bg-gray-900/5'} 
        opacity-0 hover:opacity-100
      `}></div>
    </button>
  );
};

export default ThemeToggle;
