import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Import Routes
import authRoutes from './routes/auth';
import propertyRoutes from './routes/properties';

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Global Error Handler
import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
