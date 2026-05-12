import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
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

// Start Server
app.listen(port, () => {
  console.log(`🚀 TenantEase API running on port ${port}`);
  console.log(`📊 Routes: /api/auth | /api/properties | /api/payments | /api/tenants | /api/messages | /api/analytics`);
});
