import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

/**
 * Accessible dark mode toggle component
 * 
 * Features:
 * - Proper ARIA labels and roles
 * - Keyboard navigation support
 * - Visual feedback with smooth animations
 * - High contrast icons for both themes
 * - Screen reader announcements
 */
const DarkModeToggle: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="
        relative inline-flex items-center justify-center
        w-12 h-12 rounded-full
        bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800
        transition-all duration-300 ease-in-out
        transform hover:scale-105 active:scale-95
      "
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      role="switch"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <Sun
          size={24}
          className={`
            absolute inset-0 text-yellow-500
            transition-all duration-300 ease-in-out
            ${isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
          aria-hidden="true"
        />
        
        {/* Moon Icon */}
        <Moon
          size={24}
          className={`
            absolute inset-0 text-blue-400
            transition-all duration-300 ease-in-out
            ${isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
          aria-hidden="true"
        />
      </div>
      
      {/* Screen reader only text */}
      <span className="sr-only">
        {isDark ? 'Currently in dark mode' : 'Currently in light mode'}
      </span>
    </button>
  );
};

export default DarkModeToggle;