import { Request, Response } from 'express';
import * as leadService from '../services/leadService';
import asyncHandler from '../utils/asyncHandler';
import { generateCsv } from '../utils/csvExport';
import { ILead } from '../types';

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const { status, source, search, sort, page, limit } = req.query;
  const result = await leadService.getLeads({
    status: status as ILead['status'],
    source: source as ILead['source'],
    search: search as string,
    sort: sort as 'latest' | 'oldest',
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  });
  res.json(result);
});

export const getLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(String(req.params.id));
  res.json(lead);
});

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body);
  res.status(201).json(lead);
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.updateLead(String(req.params.id), req.body);
  res.json(lead);
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  await leadService.deleteLead(String(req.params.id));
  res.json({ message: 'Lead removed' });
});

export const exportLeads = asyncHandler(async (req: Request, res: Response) => {
  const { status, source, search, sort } = req.query;
  const leads = await leadService.getLeadsForExport({
    status: status as ILead['status'],
    source: source as ILead['source'],
    search: search as string,
    sort: sort as 'latest' | 'oldest',
  });
  const csv = generateCsv(leads);
  res.header('Content-Type', 'text/csv');
  res.attachment('leads.csv');
  res.send(csv);
});
