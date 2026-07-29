import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';

dotenv.config();

const app = express();

// Middlewares Globales
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use('/api/v1/auth', authRoutes);

// Healthcheck
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    mensaje: 'API Ruba Studio activa'
  });
});

export default app;