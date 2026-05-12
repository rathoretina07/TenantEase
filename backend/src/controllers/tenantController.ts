import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

// GET /api/tenants - manager sees all tenants in their properties
export const getTenants = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;

    const tenants = await prisma.user.findMany({
      where: {
        role: 'TENANT',
        leases: {
          some: {
            unit: {
              property: { managerId: req.user!.id }
            }
          }
        },
        // Case-insensitive search (SQLite `contains` is case-insensitive for ASCII)
        ...(search ? {
          OR: [
            { email: { contains: search as string } },
            { profile: { firstName: { contains: search as string } } },
            { profile: { lastName: { contains: search as string } } },
          ]
        } : {}),
      },
      include: {
        profile: true,
        leases: {
          include: { unit: { include: { property: true } } }
        },
        payments: {
          orderBy: { dueDate: 'desc' },
          take: 5,
        }
      }
    });
    // Remove password hashes
    const safe = tenants.map(({ passwordHash, ...t }) => t);
    res.json(safe);
  } catch (error) {
    next(error);
  }
};
