import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-20 transition-opacity md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed left-0 top-0 h-full z-30 transform transition-transform bg-gray-800 text-white w-64 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 text-xl font-bold border-b border-gray-700">Leads Dashboard</div>
        <nav className="flex-1 p-4">
          <Link
            to="/dashboard"
            className={`block py-2 px-3 rounded ${location.pathname === '/dashboard' ? 'bg-gray-700' : ''}`}
            onClick={onClose}
          >
            Leads
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm">{user?.name} ({user?.role})</p>
          <button onClick={() => { logout(); onClose?.(); }} className="text-sm text-blue-300 hover:text-blue-100 mt-1">Logout</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
