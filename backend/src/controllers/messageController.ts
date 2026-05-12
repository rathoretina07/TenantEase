import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';
import { eventBus, AppEvent } from '../lib/eventEmitter';

// GET /api/messages - get all messages for the current user
export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user!.id },
          { receiverId: req.user!.id }
        ]
      },
      include: {
        sender: { include: { profile: true } },
        receiver: { include: { profile: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// POST /api/messages - send a new message
export const sendMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let { receiverId, content } = req.body;
    if (!receiverId || !content) {
      return res.status(400).json({ error: 'receiverId and content are required' });
    }

    // Support looking up user by email if receiverId looks like an email
    if (receiverId.includes('@')) {
      const targetUser = await prisma.user.findUnique({
        where: { email: receiverId }
      });
      if (!targetUser) {
        return res.status(404).json({ error: `User with email ${receiverId} not found` });
      }
      receiverId = targetUser.id;
    }

    const message = await prisma.message.create({
      data: {
        senderId: req.user!.id,
        receiverId,
        content
      },
      include: {
        sender: { include: { profile: true } },
        receiver: { include: { profile: true } }
      }
    });

    // ── Emit real-time event ──────────────────────────────────────────────
    eventBus.dispatch({
      event: AppEvent.MESSAGE_SENT,
      targetUserIds: [receiverId],
      data: { message },
      timestamp: new Date(),
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};
