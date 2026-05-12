import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, requireRole(['MANAGER']), getAnalytics);

export default router;
