import api from './api';
import type { Filters, Lead } from '../types';

type LeadPayload = Omit<Lead, '_id' | 'createdAt' | 'updatedAt'>;

export const getLeads = (filters: Filters) => api.get('/leads', { params: filters });
export const getLeadById = (id: string) => api.get(`/leads/${id}`);
export const createLead = (data: LeadPayload) => api.post('/leads', data);
export const updateLead = (id: string, data: Partial<LeadPayload>) => api.put(`/leads/${id}`, data);
export const deleteLead = (id: string) => api.delete(`/leads/${id}`);
export const exportLeads = (filters: Filters) =>
  api.get('/leads/export', { params: filters, responseType: 'blob' });