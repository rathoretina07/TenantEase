import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/messageController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getMessages);
router.post('/', authenticate, sendMessage);

export default router;
