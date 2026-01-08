require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: false,
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    timeout: 30000,
  },
  rateLimit: {
    windowMs: 900000, // 15 minutes
    max: 100, // 100 requests per window
  },
};

module.exports = { config };
