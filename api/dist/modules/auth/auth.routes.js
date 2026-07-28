"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Rutas públicas
router.post('/login', auth_controller_1.AuthController.login);
router.post('/refresh', auth_controller_1.AuthController.refresh);
router.post('/logout', auth_controller_1.AuthController.logout);
// Ruta protegida de prueba (Obtener perfil propio)
router.get('/me', auth_middleware_1.requireAuth, (req, res) => {
    res.json({
        ok: true,
        data: { usuario: req.user },
    });
});
exports.default = router;
