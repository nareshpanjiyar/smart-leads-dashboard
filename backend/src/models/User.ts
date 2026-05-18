import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'sales'], default: 'sales' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  // `this` is the document being saved. Keep typings loose here to avoid mongoose hook overload issues.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = this;
  if (!doc.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  doc.password = await bcrypt.hash(doc.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);