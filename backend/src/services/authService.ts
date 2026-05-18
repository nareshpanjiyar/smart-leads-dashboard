import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import User from '../models/User';
import HttpError from '../utils/HttpError';

export const registerUser = async (name: string, email: string, password: string, role: 'admin' | 'sales' = 'sales') => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new HttpError('User already exists', 400);
  let user;
  try {
    user = await User.create({ name, email, password, role });
  } catch (err: any) {
    // Duplicate key error (race condition where another request inserted same email)
    if (err.code === 11000) {
      throw new HttpError('Email already in use', 400);
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e: any) => e.message).join(', ');
      throw new HttpError(messages || 'Validation error', 400);
    }
    // rethrow otherwise
    throw err;
  }

  // cast to any to access mongoose document properties in this context
  const u: any = user;
  return {
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    token: generateToken(String(u._id), u.role),
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await (user as any).matchPassword(password))) {
    throw new HttpError('Invalid email or password', 401);
  }
  const u: any = user;
  return {
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    token: generateToken(String(u._id), u.role),
  };
};

const generateToken = (id: string, role: string) => {
  const secret: Secret = process.env.JWT_SECRET || 'changeme';
  const options: SignOptions = { expiresIn: (process.env.JWT_EXPIRE || '7d') as any };
  return jwt.sign({ id, role }, secret, options);
};