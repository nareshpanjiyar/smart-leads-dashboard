import { useTheme } from '../../hooks/useTheme';
import Logo from '../common/Logo';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded bg-gray-100 dark:bg-gray-700"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <Logo compact className="md:hidden" />
        <h1 className="hidden text-xl font-semibold dark:text-white md:block">Smart Leads</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="relative inline-flex items-center h-8 rounded-full w-14 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          aria-label="Toggle dark mode"
          style={{ background: darkMode ? '#374151' : '#E5E7EB' }}
        >
          <span
            className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
