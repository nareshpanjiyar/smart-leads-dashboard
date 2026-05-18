import Lead from '../models/Lead';
import { ILead } from '../types';

interface FilterParams {
  status?: string;
  source?: string;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}

export const getLeads = async (filters: FilterParams) => {
  const { status, source, search, sort, page = 1, limit = 10 } = filters;
  const query: any = {};

  if (status) query.status = status;
  if (source) query.source = source;
  if (search) {
    const regex = { $regex: search, $options: 'i' };
    query.$or = [{ name: regex }, { email: regex }];
  }

  const sortOption: any = {};
  sortOption.createdAt = sort === 'oldest' ? 1 : -1;

  const skip = (page - 1) * limit;
  const [leads, total] = await Promise.all([
    Lead.find(query).sort(sortOption).skip(skip).limit(limit),
    Lead.countDocuments(query),
  ]);

  return {
    leads,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getLeadById = async (id: string) => {
  const lead = await Lead.findById(id);
  if (!lead) throw new Error('Lead not found');
  return lead;
};

export const createLead = async (data: Partial<ILead>) => {
  return Lead.create(data);
};

export const updateLead = async (id: string, data: Partial<ILead>) => {
  const lead = await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!lead) throw new Error('Lead not found');
  return lead;
};

export const deleteLead = async (id: string) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw new Error('Lead not found');
  return lead;
};

export const getLeadsForExport = async (filters: FilterParams) => {
  const { status, source, search, sort = 'latest' } = filters;
  const query: any = {};
  if (status) query.status = status;
  if (source) query.source = source;
  if (search) {
    const regex = { $regex: search, $options: 'i' };
    query.$or = [{ name: regex }, { email: regex }];
  }
  const sortOption: any = {};
  sortOption.createdAt = sort === 'oldest' ? 1 : -1;
  return Lead.find(query).sort(sortOption);
};