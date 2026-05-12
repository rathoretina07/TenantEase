import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { eventBus, AppEvent, AppEventPayload } from './eventEmitter';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-fallback-key';

let io: Server;

// ── Authenticated socket type ───────────────────────────────────────────────
interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

// ── Initialise Socket.io ────────────────────────────────────────────────────
export function initSocketServer(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost')) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    },
  });

  // ── JWT Auth Middleware ──────────────────────────────────────────────────
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
      socket.userId = decoded.userId;
      socket.userRole = decoded.role;
      next();
    } catch {
      return next(new Error('Invalid or expired token'));
    }
  });

  // ── Connection Handler ──────────────────────────────────────────────────
  io.on('connection', (socket: AuthenticatedSocket) => {
    const userId = socket.userId!;
    console.log(`🔌 Socket connected: user_${userId}`);

    // Join the user to their private room
    socket.join(`user_${userId}`);

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: user_${userId}`);
    });
  });

  // ── Bridge Event Bus → Socket.io ────────────────────────────────────────
  // Listen to ALL defined events and push to target users
  const allEvents = Object.values(AppEvent);
  for (const event of allEvents) {
    eventBus.on(event, (payload: AppEventPayload) => {
      for (const targetId of payload.targetUserIds) {
        io.to(`user_${targetId}`).emit(event, {
          event: payload.event,
          data: payload.data,
          timestamp: payload.timestamp,
        });
      }
    });
  }

  return io;
}

/** Getter for the Socket.io server instance */
export function getIO(): Server {
  if (!io) throw new Error('Socket.io not initialised – call initSocketServer first');
  return io;
}
