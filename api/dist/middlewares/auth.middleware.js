"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            ok: false,
            message: 'Acceso no autorizado. Token no proporcionado.',
        });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        // Verificar firma con la Clave Pública
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.user = decoded; // Adjuntar payload al objeto req
        next(); // Dar paso al controlador
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Token inválido o expirado.',
            error: error.message,
        });
    }
}
