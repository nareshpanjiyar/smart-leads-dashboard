import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // ZodError exposes `issues` which contains the validation errors
      return res.status(400).json({ message: result.error.issues });
    }
    req.body = result.data;
    next();
  };
};

export default validate;