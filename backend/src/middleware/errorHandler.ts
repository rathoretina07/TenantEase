import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues.map((e: any) => ({ path: e.path.join('.'), message: e.message }))
    });
  }

  // Handle Prisma errors (basic mapping)
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Unique constraint failed, record already exists.' });
  }

  // Handle standard HTTP errors
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
}
