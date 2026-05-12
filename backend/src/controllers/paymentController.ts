import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';
import { eventBus, AppEvent } from '../lib/eventEmitter';

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

// POST /api/payments/:id/pay - tenant marks a payment as paid
export const makePayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const paymentId = req.params.id as string;
    const paymentMethod: string = req.body.paymentMethod || 'BANK_TRANSFER';

    const payment = await prisma.payment.findFirst({
      where: { id: paymentId, tenantId: req.user!.id },
      include: { lease: { include: { unit: { include: { property: true } } } } }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status === 'COMPLETED') {
      return res.status(400).json({ error: 'Payment already completed' });
    }

    const managerId = payment.lease.unit.property.managerId;

    const updated = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'COMPLETED',
        paidDate: new Date(),
        paymentMethod,
      },
      include: {
        tenant: { include: { profile: true } },
        lease: { include: { unit: { include: { property: true } } } }
      }
    });

    // ── Emit real-time event ──────────────────────────────────────────────
    eventBus.dispatch({
      event: AppEvent.PAYMENT_RECEIVED,
      targetUserIds: [managerId, req.user!.id],
      data: { payment: updated },
      timestamp: new Date(),
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
};
