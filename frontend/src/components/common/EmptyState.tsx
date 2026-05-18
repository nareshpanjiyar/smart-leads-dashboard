import React from 'react';

const EmptyState: React.FC<{ message?: string }> = ({ message = 'No data found.' }) => (
  <div className="text-center p-8 text-gray-500 dark:text-gray-400">{message}</div>
);

export default EmptyState;