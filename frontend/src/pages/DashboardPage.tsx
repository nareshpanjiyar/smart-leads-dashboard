import React, { useState, useEffect, useCallback } from 'react';
import type { Lead, Filters, LeadPayload } from '../types';
import { getLeads, createLead, updateLead, deleteLead, exportLeads } from '../services/leadService';
import { useDebounce } from '../hooks/useDebounce';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/errorMessage';
import LeadFilters from '../components/leads/LeadFilters';
import LeadTable from '../components/leads/LeadTable';
import Modal from '../components/common/Modal';
import LeadForm from '../components/leads/LeadForm';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const canEdit = user?.role === 'admin';
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState<Filters>({
    status: '',
    source: '',
    search: '',
    sort: 'latest',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, page: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 500);

  const loadLeads = useCallback((params: Filters) => {
    void getLeads(params)
      .then(({ data }) => {
      setLeads(data.leads);
      setPagination(data.pagination);
        setError('');
      })
      .catch((err: unknown) => {
        setError(getErrorMessage(err, 'Failed to load leads'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadLeads({
      ...filters,
      search: debouncedSearch,
      page: filters.page,
    });
  }, [debouncedSearch, filters, loadLeads]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoading(true);
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const openCreateModal = () => {
    setEditingLead(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async (formData: LeadPayload) => {
    setFormLoading(true);
    try {
      if (editingLead) {
        await updateLead(editingLead._id, formData);
      } else {
        await createLead(formData);
      }
      setModalOpen(false);
      setLoading(true);
      loadLeads({ ...filters, search: debouncedSearch });
    } catch (err: unknown) {
      alert(getErrorMessage(err, 'Operation failed'));
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await deleteLead(id);
      setLoading(true);
      loadLeads({ ...filters, search: debouncedSearch });
    } catch (err: unknown) {
      alert(getErrorMessage(err, 'Delete failed'));
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportLeads({
        status: filters.status,
        source: filters.source,
        search: debouncedSearch,
        sort: filters.sort,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: unknown) {
      alert(getErrorMessage(err, 'Export failed'));
    }
  };

  return (
    <div>
      <LeadFilters
        filters={{
          status: filters.status || '',
          source: filters.source || '',
          search: filters.search || '',
          sort: filters.sort || 'latest',
        }}
        onChange={handleFilterChange}
        onExport={handleExport}
        canCreate={canEdit}
        onCreate={openCreateModal}
      />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <LeadTable leads={leads} onEdit={handleEdit} onDelete={handleDelete} canEdit={canEdit} />
          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`px-3 py-1 rounded ${p === pagination.page ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingLead ? 'Edit Lead' : 'New Lead'}>
        <LeadForm
          initialData={editingLead ? {
            name: editingLead.name,
            email: editingLead.email,
            status: editingLead.status,
            source: editingLead.source,
          } : undefined}
          onSubmit={handleFormSubmit}
          isLoading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
