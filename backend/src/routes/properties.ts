import { Router } from 'express';
import { getProperties, createProperty, getPropertyById } from '../controllers/propertyController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

// Only managers can access property routes
router.use(authenticate, requireRole(['MANAGER']));

router.get('/', getProperties);
router.post('/', createProperty);
router.get('/:id', getPropertyById);

export default router;
