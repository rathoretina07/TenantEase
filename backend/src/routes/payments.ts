import { Router } from 'express';
import { getPayments, getMyPayments, makePayment } from '../controllers/paymentController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, requireRole(['MANAGER']), getPayments);
router.get('/my', authenticate, getMyPayments);
router.post('/:id/pay', authenticate, requireRole(['TENANT']), makePayment);

export default router;
