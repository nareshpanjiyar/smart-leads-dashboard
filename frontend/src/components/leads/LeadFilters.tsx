import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

interface LeadFiltersProps {
  filters: {
    status: string;
    source: string;
    search: string;
    sort: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onExport: () => void;
  canCreate: boolean;
  onCreate: () => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ filters, onChange, onExport, canCreate, onCreate }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input label="Search" name="search" value={filters.search} onChange={onChange} placeholder="Name or email" />
        <Select
          label="Status"
          name="status"
          value={filters.status}
          onChange={onChange}
          options={[
            { value: '', label: 'All' },
            { value: 'New', label: 'New' },
            { value: 'Contacted', label: 'Contacted' },
            { value: 'Qualified', label: 'Qualified' },
            { value: 'Lost', label: 'Lost' },
          ]}
        />
        <Select
          label="Source"
          name="source"
          value={filters.source}
          onChange={onChange}
          options={[
            { value: '', label: 'All' },
            { value: 'Website', label: 'Website' },
            { value: 'Instagram', label: 'Instagram' },
            { value: 'Referral', label: 'Referral' },
          ]}
        />
        <Select
          label="Sort"
          name="sort"
          value={filters.sort}
          onChange={onChange}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          {canCreate && <Button onClick={onCreate}>+ New Lead</Button>}
        </div>
        <Button variant="secondary" onClick={onExport}>Export CSV</Button>
      </div>
    </div>
  );
};

export default LeadFilters;