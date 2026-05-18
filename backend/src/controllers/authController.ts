import { Request, Response } from 'express';
import * as authService from '../services/authService';
import asyncHandler from '../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = await authService.registerUser(name, email, password, role);
  res.status(201).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  res.json(user);
});