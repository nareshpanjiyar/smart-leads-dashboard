import mongoose, { Schema } from 'mongoose';
import { ILead } from '../types';

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'],
      default: 'New',
    },
    source: {
      type: String,
      enum: ['Website', 'Instagram', 'Referral'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILead>('Lead', leadSchema);