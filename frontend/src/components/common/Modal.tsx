import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;