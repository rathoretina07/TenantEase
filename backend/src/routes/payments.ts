import { Router } from 'express';
import { getPayments, getMyPayments } from '../controllers/paymentController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, requireRole(['MANAGER']), getPayments);
router.get('/my', authenticate, getMyPayments);

export default router;
