import { Router } from 'express';
import { getTenants } from '../controllers/tenantController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, requireRole(['MANAGER']), getTenants);

export default router;
