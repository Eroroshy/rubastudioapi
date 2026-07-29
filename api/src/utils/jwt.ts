import dotenv from "dotenv";
import jwt, { SignOptions } from "jsonwebtoken";

dotenv.config();

// Reconstruir las llaves PEM desde Base64
const privateKey = Buffer.from(
  process.env.JWT_PRIVATE_KEY_BASE64 || "",
  "base64",
).toString("utf-8");

const publicKey = Buffer.from(
  process.env.JWT_PUBLIC_KEY_BASE64 || "",
  "base64",
).toString("utf-8");

export interface TokenPayload {
  uid: string;
  email: string;
  rol: string;
}

/**
 * Firma un Access Token con la clave PRIVADA usando el algoritmo RS256
 */
export function signAccessToken(payload: TokenPayload): string {
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ||
      "15m") as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, privateKey, options);
}

/**
 * Firma un Refresh Token con la clave PRIVADA
 */
export function signRefreshToken(payload: { uid: string }): string {
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ||
      "7d") as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, privateKey, options);
}

/**
 * Verifica un Access Token usando la clave PÚBLICA
 */
export function verifyAccessToken(token: string): TokenPayload {
  const publicKeyEnv = process.env.JWT_PUBLIC_KEY_BASE64;

  if (!publicKeyEnv) {
    console.error(
      "❌ ERROR CRÍTICO: JWT_PUBLIC_KEY_BASE64 no está definida en Vercel.",
    );
    throw new Error(
      "Error interno del servidor: Llave pública no configurada.",
    );
  }

  const publicKey = Buffer.from(publicKeyEnv, "base64").toString("utf-8");

  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
  }) as TokenPayload;
}

/**
 * Verifica un Refresh Token usando la clave PÚBLICA
 */
export function verifyRefreshToken(token: string): { uid: string } {
  const publicKeyEnv = process.env.JWT_PUBLIC_KEY_BASE64;

  if (!publicKeyEnv) {
    console.error(
      "❌ ERROR CRÍTICO: JWT_PUBLIC_KEY_BASE64 no está definida en Vercel.",
    );
    throw new Error(
      "Error interno del servidor: Llave pública no configurada.",
    );
  }

  const publicKey = Buffer.from(publicKeyEnv, "base64").toString("utf-8");

  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
  }) as { uid: string };
}
