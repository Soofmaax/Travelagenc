import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode state with persistence and system preference detection
 * 
 * Features:
 * - Respects user's system preference (prefers-color-scheme)
 * - Persists user choice in localStorage
 * - Provides smooth transitions between themes
 * - Handles SSR compatibility
 * 
 * @returns {Object} Object containing isDark state and toggle function
 */
export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return false;
    }

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return { isDark, toggleDarkMode };
};