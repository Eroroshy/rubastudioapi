"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        error: 'El correo electrónico es obligatorio.',
    })
        .email('Formato de correo electrónico inválido.')
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string({
        error: 'La contraseña es obligatoria.',
    })
        .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});
