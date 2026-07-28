"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
class AuthController {
    static async login(req, res) {
        try {
            // 1. Validar Body con Zod
            const validation = auth_schema_1.loginSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({
                    ok: false,
                    message: 'Datos de entrada inválidos.',
                    errors: validation.error.flatten().fieldErrors,
                });
                return;
            }
            // 2. Iniciar sesión
            const result = await auth_service_1.AuthService.login(validation.data);
            // 3. Inyectar Refresh Token en Cookie httpOnly (Seguro contra XSS)
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true, // No accesible mediante JavaScript en navegador
                secure: process.env.NODE_ENV === 'production', // Requiere HTTPS en prod
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
            });
            // 4. Responder con Access Token en payload JSON
            res.status(200).json({
                ok: true,
                message: 'Autenticación exitosa.',
                data: {
                    accessToken: result.accessToken,
                    usuario: result.usuario,
                },
            });
        }
        catch (error) {
            res.status(401).json({
                ok: false,
                message: error.message || 'Error de autenticación.',
            });
        }
    }
    static async refresh(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(401).json({ ok: false, message: 'Refresh token no proporcionado.' });
                return;
            }
            const result = await auth_service_1.AuthService.refreshSession(refreshToken);
            res.status(200).json({
                ok: true,
                data: { accessToken: result.accessToken },
            });
        }
        catch (error) {
            res.status(401).json({ ok: false, message: error.message || 'Sesión expirada.' });
        }
    }
    static async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken) {
                await auth_service_1.AuthService.logout(refreshToken);
            }
            // Limpiar la cookie en el navegador
            res.clearCookie('refreshToken');
            res.status(200).json({
                ok: true,
                message: 'Sesión cerrada correctamente.',
            });
        }
        catch (error) {
            res.status(500).json({ ok: false, message: 'Error al cerrar sesión.' });
        }
    }
}
exports.AuthController = AuthController;
