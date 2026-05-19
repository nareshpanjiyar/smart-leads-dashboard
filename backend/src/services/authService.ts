import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Error as MongooseError } from 'mongoose';
import User from '../models/User';
import { IUser } from '../types';
import HttpError from '../utils/HttpError';

type AuthUserResponse = Pick<IUser, '_id' | 'name' | 'email' | 'role'> & {
  token: string;
};

const toAuthResponse = (user: IUser): AuthUserResponse => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(String(user._id), user.role),
});

export const registerUser = async (name: string, email: string, password: string, role: 'admin' | 'sales' = 'sales') => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new HttpError('User already exists', 400);

  try {
    const user = await User.create({ name, email, password, role });
    return toAuthResponse(user);
  } catch (err: unknown) {
    // Duplicate key error (race condition where another request inserted same email)
    if (typeof err === 'object' && err !== null && 'code' in err && err.code === 11000) {
      throw new HttpError('Email already in use', 400);
    }
    // Mongoose validation error
    if (err instanceof MongooseError.ValidationError) {
      const messages = Object.values(err.errors).map((e) => e.message).join(', ');
      throw new HttpError(messages || 'Validation error', 400);
    }
    // rethrow otherwise
    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new HttpError('Invalid email or password', 401);
  }
  return toAuthResponse(user);
};

const generateToken = (id: string, role: string) => {
  const secret: Secret = process.env.JWT_SECRET || 'changeme';
  const expiresIn = (process.env.JWT_EXPIRE || '7d') as SignOptions['expiresIn'];
  const options: SignOptions = { expiresIn };
  return jwt.sign({ id, role }, secret, options);
};
