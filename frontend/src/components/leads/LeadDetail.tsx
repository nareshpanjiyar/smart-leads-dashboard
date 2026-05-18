import React from 'react';
import type { Lead } from '../../types';

const LeadDetail: React.FC<{ lead: Lead }> = ({ lead }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-lg">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">{lead.name}</h2>
      <p className="dark:text-gray-300"><strong>Email:</strong> {lead.email}</p>
      <p className="dark:text-gray-300"><strong>Status:</strong> {lead.status}</p>
      <p className="dark:text-gray-300"><strong>Source:</strong> {lead.source}</p>
      <p className="dark:text-gray-300"><strong>Created:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default LeadDetail;