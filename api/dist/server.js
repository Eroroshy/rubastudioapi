"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middlewares Globales
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)()); // Permite a Express leer req.cookies
// Rutas de la API
app.use('/api/v1/auth', auth_routes_1.default);
// Healthcheck
app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true, mensaje: 'API Ruba Studio activa' });
});
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
