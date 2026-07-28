"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Reconstruir las llaves PEM desde Base64
const privateKey = Buffer.from(process.env.JWT_PRIVATE_KEY_BASE64 || '', 'base64').toString('utf-8');
const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY_BASE64 || '', 'base64').toString('utf-8');
if (!privateKey || !publicKey) {
    throw new Error('Las llaves JWT no están configuradas correctamente.');
}
const accessTokenOptions = {
    algorithm: 'RS256',
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || '15m'),
};
const refreshTokenOptions = {
    algorithm: 'RS256',
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d'),
};
/**
 * Firma un Access Token con la clave PRIVADA usando RS256
 */
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, privateKey, accessTokenOptions);
}
/**
 * Firma un Refresh Token con la clave PRIVADA
 */
function signRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, privateKey, refreshTokenOptions);
}
/**
 * Verifica un Access Token usando la clave PÚBLICA
 */
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, publicKey, {
        algorithms: ['RS256'],
    });
}
/**
 * Verifica un Refresh Token usando la clave PÚBLICA
 */
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, publicKey, {
        algorithms: ['RS256'],
    });
}
