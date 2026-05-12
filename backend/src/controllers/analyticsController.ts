import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

// GET /api/analytics - manager dashboard stats
export const getAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const managerId = req.user!.id;

    const [totalProperties, totalUnits, occupiedUnits, totalTenants, revenueAgg, pendingPayments] = await Promise.all([
      prisma.property.count({ where: { managerId, deletedAt: null } }),
      prisma.unit.count({ where: { property: { managerId }, deletedAt: null } }),
      prisma.unit.count({ where: { property: { managerId }, status: 'OCCUPIED', deletedAt: null } }),
      prisma.user.count({
        where: {
          role: 'TENANT',
          leases: { some: { unit: { property: { managerId } }, status: 'ACTIVE' } }
        }
      }),
      prisma.payment.aggregate({
        where: {
          status: 'COMPLETED',
          lease: { unit: { property: { managerId } } }
        },
        _sum: { amount: true }
      }),
      prisma.payment.count({
        where: {
          status: 'PENDING',
          lease: { unit: { property: { managerId } } }
        }
      })
    ]);

    res.json({
      totalProperties,
      totalUnits,
      occupiedUnits,
      vacantUnits: totalUnits - occupiedUnits,
      occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
      totalTenants,
      totalRevenue: revenueAgg._sum.amount ?? 0,
      pendingPayments
    });
  } catch (error) {
    next(error);
  }
};
