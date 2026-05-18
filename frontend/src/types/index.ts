export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LeadsResponse {
  leads: Lead[];
  pagination: PaginationMeta;
}

export interface Filters {
  status?: string;
  source?: string;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}