import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

// GET /api/analytics - manager dashboard stats
export const getAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const managerId = req.user!.id;

    // Get current date and 6 months ago for time-series data
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [totalProperties, totalUnits, occupiedUnits, totalTenants, revenueAgg, pendingPayments, outstandingAgg, payments] = await Promise.all([
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
      }),
      prisma.payment.aggregate({
        where: {
          status: 'PENDING',
          lease: { unit: { property: { managerId } } }
        },
        _sum: { amount: true }
      }),
      prisma.payment.findMany({
        where: {
          status: 'COMPLETED',
          lease: { unit: { property: { managerId } } },
          paidDate: { gte: sixMonthsAgo }
        },
        select: {
          amount: true,
          paidDate: true
        }
      })
    ]);

    // Group payments by month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRevenueMap: Record<string, number> = {};
    
    // Initialize last 6 months
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = months[d.getMonth()];
      monthlyRevenueMap[monthLabel] = 0;
    }

    payments.forEach(p => {
      if (p.paidDate) {
        const monthLabel = months[p.paidDate.getMonth()];
        if (monthlyRevenueMap[monthLabel] !== undefined) {
          monthlyRevenueMap[monthLabel] += p.amount;
        }
      }
    });

    const monthlyRevenue = Object.entries(monthlyRevenueMap)
      .map(([month, revenue]) => ({ month, revenue }))
      .reverse();

    res.json({
      totalProperties,
      totalUnits,
      occupiedUnits,
      vacantUnits: totalUnits - occupiedUnits,
      occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
      totalTenants,
      totalRevenue: revenueAgg._sum.amount ?? 0,
      pendingPayments,
      outstandingAmount: outstandingAgg._sum.amount ?? 0,
      monthlyRevenue
    });
  } catch (error) {
    next(error);
  }
};
