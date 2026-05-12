import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

// GET /api/payments - manager sees all payments for their properties
export const getPayments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        lease: {
          unit: {
            property: { managerId: req.user!.id }
          }
        }
      },
      include: {
        tenant: { include: { profile: true } },
        lease: { include: { unit: { include: { property: true } } } }
      },
      orderBy: { dueDate: 'desc' }
    });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

// GET /api/payments/my - tenant sees their own payments
export const getMyPayments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { tenantId: req.user!.id },
      include: {
        lease: { include: { unit: { include: { property: true } } } }
      },
      orderBy: { dueDate: 'desc' }
    });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};
