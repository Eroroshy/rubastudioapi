"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Reemplazar los caracteres '\\n' que dotenv carga como texto literal por saltos de línea reales
const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;
// Prevenir la inicialización múltiple de la app de Firebase en modo de desarrollo
if (!(0, app_1.getApps)().length) {
    (0, app_1.initializeApp)({
        credential: (0, app_1.cert)({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
}
// Exportar la instancia de Firestore requerida en tus servicios
exports.db = (0, firestore_1.getFirestore)();
// Exportar la instancia de Firebase Auth Admin (opcional pero muy útil para auth)
exports.auth = (0, auth_1.getAuth)();
