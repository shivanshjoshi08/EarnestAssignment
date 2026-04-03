import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'default-access-secret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
};
