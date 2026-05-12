import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initSocketServer } from './lib/socket';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow all localhost origins (any port) and no-origin requests
    if (!origin || origin.startsWith('http://localhost')) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req: any, res: any) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────
import authRoutes from './routes/auth';
import propertyRoutes from './routes/properties';
import paymentRoutes from './routes/payments';
import tenantRoutes from './routes/tenants';
import messageRoutes from './routes/messages';
import analyticsRoutes from './routes/analytics';

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsRoutes);

// Global Error Handler
import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler);

// ─── Initialise Socket.io ─────────────────────────────────────────────────
initSocketServer(httpServer);

// ─── Start Server (use httpServer, not app.listen) ────────────────────────
httpServer.listen(port, () => {
  console.log(`🚀 TenantEase API running on port ${port}`);
  console.log(`🔌 Socket.io WebSocket server attached`);
  console.log(`📊 Routes: /api/auth | /api/properties | /api/payments | /api/tenants | /api/messages | /api/analytics`);
});
