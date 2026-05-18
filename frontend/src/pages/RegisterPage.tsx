import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import ErrorMessage from '../components/common/ErrorMessage';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'sales' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Register</h1>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit}>
          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
          <Select label="Role" name="role" value={form.role} onChange={handleChange}
            options={[
              { value: 'sales', label: 'Sales User' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;