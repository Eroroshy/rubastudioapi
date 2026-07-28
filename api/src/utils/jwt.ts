import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Reconstruir las llaves PEM desde Base64
const privateKey = Buffer.from(
  process.env.JWT_PRIVATE_KEY_BASE64 || '',
  'base64'
).toString('utf-8');

const publicKey = Buffer.from(
  process.env.JWT_PUBLIC_KEY_BASE64 || '',
  'base64'
).toString('utf-8');

if (!privateKey || !publicKey) {
  throw new Error('Las llaves JWT no están configuradas correctamente.');
}

export interface TokenPayload {
  uid: string;
  email: string;
  rol: string;
}

const accessTokenOptions: SignOptions = {
  algorithm: 'RS256',
  expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as SignOptions['expiresIn'],
};

const refreshTokenOptions: SignOptions = {
  algorithm: 'RS256',
  expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
};

/**
 * Firma un Access Token con la clave PRIVADA usando RS256
 */
export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, privateKey, accessTokenOptions);
}

/**
 * Firma un Refresh Token con la clave PRIVADA
 */
export function signRefreshToken(payload: { uid: string }): string {
  return jwt.sign(payload, privateKey, refreshTokenOptions);
}

/**
 * Verifica un Access Token usando la clave PÚBLICA
 */
export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
  }) as TokenPayload;
}

/**
 * Verifica un Refresh Token usando la clave PÚBLICA
 */
export function verifyRefreshToken(token: string): { uid: string } {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
  }) as { uid: string };
}