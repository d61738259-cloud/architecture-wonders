import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import calculatorRoutes from './routes/calculatorRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import seoRoutes from './routes/seoRoutes.js';

import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas / Local Database
connectDB();

// Production Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible CDN image assets
    crossOriginEmbedderPolicy: false,
  })
);

// Compression for optimal bandwidth & performance
app.use(compression());

// Request logging in development/production
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || origin.endsWith('.netlify.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev, can restrict strictly
    },
    credentials: true,
  })
);

// Body Parsers with safe payload limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Apply rate limiter to /api routes
app.use('/api', apiLimiter);

// SEO Routes (sitemap.xml and robots.txt)
app.use('/', seoRoutes);

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    studio: 'Architecture Wonders',
    location: 'Zirakpur, Punjab',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount Resource API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

// Catch 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Architecture Wonders Backend] Listening on port ${PORT}`);
  });
}

export default app;
