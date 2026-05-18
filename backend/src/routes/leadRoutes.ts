import { Router } from 'express';
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  exportLeads,
} from '../controllers/leadController';
import auth from '../middleware/auth';
import role from '../middleware/role';
import validate from '../middleware/validate';
import { z } from 'zod';

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

const updateLeadSchema = leadSchema.partial();

router.use(auth); // protect all routes

router.route('/')
  .get(role('admin', 'sales'), getLeads)
  .post(role('admin'), validate(leadSchema), createLead);

router.get('/export', role('admin', 'sales'), exportLeads);

router.route('/:id')
  .get(role('admin', 'sales'), getLead)
  .put(role('admin'), validate(updateLeadSchema), updateLead)
  .delete(role('admin'), deleteLead);

export default router;