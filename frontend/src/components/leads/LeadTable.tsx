import React from 'react';
import type { Lead } from '../../types';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import EmptyState from '../common/EmptyState';

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  canEdit: boolean;
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, onEdit, onDelete, canEdit }) => {
  const navigate = useNavigate();

  if (!leads.length) return <EmptyState message="No leads found." />;

  return (
    <>
      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              {canEdit && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => navigate(`/leads/${lead._id}`)}>
                <td className="px-4 py-3 text-sm dark:text-gray-200">{lead.name}</td>
                <td className="px-4 py-3 text-sm dark:text-gray-200">{lead.email}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : ''}
                    ${lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${lead.status === 'Qualified' ? 'bg-green-100 text-green-800' : ''}
                    ${lead.status === 'Lost' ? 'bg-red-100 text-red-800' : ''}
                  `}>{lead.status}</span>
                </td>
                <td className="px-4 py-3 text-sm dark:text-gray-200">{lead.source}</td>
                <td className="px-4 py-3 text-sm dark:text-gray-200">{new Date(lead.createdAt).toLocaleDateString()}</td>
                {canEdit && (
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="secondary" onClick={() => onEdit(lead)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(lead._id)} className="ml-2">Delete</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card list for small screens */}
      <div className="md:hidden space-y-3">
        {leads.map((lead) => (
          <div key={lead._id} className="bg-white dark:bg-gray-800 rounded shadow p-4" onClick={() => navigate(`/leads/${lead._id}`)}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm dark:text-gray-100">{lead.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{lead.email}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 dark:text-gray-300">{new Date(lead.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : ''}
                  ${lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${lead.status === 'Qualified' ? 'bg-green-100 text-green-800' : ''}
                  ${lead.status === 'Lost' ? 'bg-red-100 text-red-800' : ''}
                `}>{lead.status}</span>
                <span className="ml-3 text-xs text-gray-500 dark:text-gray-300">{lead.source}</span>
              </div>
              {canEdit && (
                <div className="flex items-center">
                  <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onEdit(lead); }}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); onDelete(lead._id); }} className="ml-2">Delete</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeadTable;