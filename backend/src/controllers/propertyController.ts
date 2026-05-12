import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';
import { eventBus, AppEvent } from '../lib/eventEmitter';

const createPropertySchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string().default('USA'),
  units: z.array(z.object({
    unitNumber: z.string().min(1),
    bedrooms: z.number().int().min(0).default(1),
    bathrooms: z.number().min(0).default(1),
    rentAmount: z.number().min(0),
    status: z.string().default('VACANT'),
  })).optional(),
});

export const getProperties = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;

    const properties = await prisma.property.findMany({
      where: {
        managerId: req.user!.id,
        deletedAt: null,
        // Case-insensitive search (works on both SQLite and Postgres)
        ...(search ? {
          OR: [
            { name: { contains: (search as string) } },
            { address: { contains: (search as string) } },
            { city: { contains: (search as string) } },
          ]
        } : {}),
      },
      include: {
        units: {
          include: {
            leases: { where: { status: 'ACTIVE' }, include: { tenant: { include: { profile: true } } } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = createPropertySchema.parse(req.body);
    const { units, ...propertyData } = data;

    // ACID transaction: create property + all units atomically
    const property = await prisma.$transaction(async (tx) => {
      const prop = await tx.property.create({
        data: {
          ...propertyData,
          managerId: req.user!.id,
          ...(units && units.length > 0 ? {
            units: {
              create: units.map(u => ({
                unitNumber: u.unitNumber,
                bedrooms: u.bedrooms,
                bathrooms: u.bathrooms,
                rentAmount: u.rentAmount,
                status: u.status,
              })),
            }
          } : {}),
        },
        include: { units: true },
      });
      return prop;
    });

    // ── Emit event ────────────────────────────────────────────────────────
    eventBus.dispatch({
      event: AppEvent.PROPERTY_CREATED,
      targetUserIds: [req.user!.id],
      data: { property },
      timestamp: new Date(),
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
