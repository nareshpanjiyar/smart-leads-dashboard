import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

interface LeadFormData {
  name: string;
  email: string;
  status: string;
  source: string;
}

interface LeadFormProps {
  initialData?: LeadFormData;
  onSubmit: (data: LeadFormData) => void;
  isLoading?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [form, setForm] = useState<LeadFormData>(
    initialData || { name: '', email: '', status: 'New', source: 'Website' }
  );
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});

  const validate = () => {
    const errs: Partial<LeadFormData> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
      <Select label="Status" name="status" value={form.status} onChange={handleChange}
        options={[
          { value: 'New', label: 'New' },
          { value: 'Contacted', label: 'Contacted' },
          { value: 'Qualified', label: 'Qualified' },
          { value: 'Lost', label: 'Lost' },
        ]}
      />
      <Select label="Source" name="source" value={form.source} onChange={handleChange}
        options={[
          { value: 'Website', label: 'Website' },
          { value: 'Instagram', label: 'Instagram' },
          { value: 'Referral', label: 'Referral' },
        ]}
      />
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
};

export default LeadForm;