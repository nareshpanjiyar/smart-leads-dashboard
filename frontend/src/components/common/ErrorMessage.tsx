import React from 'react';

const ErrorMessage: React.FC<{ message?: string }> = ({ message = 'Something went wrong.' }) => (
  <div className="text-center p-8 text-red-500">{message}</div>
);

export default ErrorMessage;