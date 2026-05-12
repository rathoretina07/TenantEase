import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

const createPropertySchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string().default('USA'),
});

export const getProperties = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const properties = await prisma.property.findMany({
      where: { managerId: req.user!.id, deletedAt: null },
      include: {
        units: {
          include: {
            leases: { where: { status: 'ACTIVE' }, include: { tenant: { include: { profile: true } } } }
          }
        }
      }
    });

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = createPropertySchema.parse(req.body);

    const property = await prisma.property.create({
      data: {
        ...data,
        managerId: req.user!.id,
      }
    });

    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    
    const property = await prisma.property.findFirst({
      where: { id, managerId: req.user!.id, deletedAt: null },
      include: { units: true }
    });

    if (!property) return res.status(404).json({ error: 'Property not found' });

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};
