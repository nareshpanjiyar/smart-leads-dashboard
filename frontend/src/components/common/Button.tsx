import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
  secondary: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
};

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  return (
    <button
      className={`rounded-lg transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;