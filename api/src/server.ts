import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares Globales
app.use(express.json());
app.use(cookieParser()); // Permite a Express leer req.cookies

// Rutas de la API
app.use('/api/v1/auth', authRoutes);

// Healthcheck
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, mensaje: 'API Ruba Studio activa' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});