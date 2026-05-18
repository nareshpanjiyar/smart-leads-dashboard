import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const DarkToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="fixed right-4 bottom-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 flex items-center justify-center transition-transform hover:scale-105"
    >
      <svg className="w-5 h-5 text-yellow-400 dark:text-yellow-300" viewBox="0 0 24 24" fill="none">
        {darkMode ? (
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
        ) : (
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
};

export default DarkToggle;
