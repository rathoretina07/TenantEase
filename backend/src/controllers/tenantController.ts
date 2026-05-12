import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

// GET /api/tenants - manager sees all tenants in their properties
export const getTenants = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tenants = await prisma.user.findMany({
      where: {
        role: 'TENANT',
        leases: {
          some: {
            unit: {
              property: { managerId: req.user!.id }
            }
          }
        }
      },
      include: {
        profile: true,
        leases: {
          include: { unit: { include: { property: true } } }
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
