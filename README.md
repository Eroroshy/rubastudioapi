# 🔒 RubaStudio Auth API

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge\&logo=vercel\&logoColor=white)](https://vercel.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)](https://expressjs.com/)

API Serverless desarrollada en **TypeScript + Express** para la gestión de autenticación de **RubaStudio**.

Implementa un sistema seguro de autenticación basado en **JWT firmado mediante RSA (RS256)**, gestión de sesiones con cookies `httpOnly`, validación de datos con **Zod** e integración con servicios externos.

---

## 🌐 URL Base de Producción

```
https://rubastudioapi-a6mel4g5p-eroroshy.vercel.app
```

---

# 📌 Tabla de Contenidos

* [Características](#-características)
* [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
* [Estructura del Proyecto](#-estructura-del-proyecto)
* [Endpoints](#-endpoints)
* [Instalación Local](#-instalación-local)
* [Variables de Entorno](#-variables-de-entorno)
* [Despliegue](#-despliegue)
* [Seguridad](#-seguridad)

---

# 🚀 Características

* ⚡ **Arquitectura Serverless:** desplegada sobre infraestructura Vercel.
* 🔐 **Autenticación segura:** implementación de JWT utilizando algoritmo RSA RS256.
* 🔑 **Firma asimétrica:** uso de llave privada para firmar tokens y llave pública para validación.
* 🍪 **Gestión de sesiones:** soporte para cookies `httpOnly` mediante refresh tokens.
* 🔄 **Renovación de sesión:** generación de nuevos Access Tokens mediante Refresh Tokens.
* 🛡️ **Validación con Zod:** validación estricta de datos antes de ejecutar lógica de negocio.
* 📘 **TypeScript Strict Mode:** código completamente tipado.
* 🧩 **Arquitectura modular:** separación por módulos, servicios, controladores y middlewares.

---

# 🏗️ Arquitectura del Proyecto

La API sigue una arquitectura modular basada en capas:

```
Request
   |
   ↓
Express Router
   |
   ↓
Controller
   |
   ↓
Service
   |
   ↓
External Services / JWT
   |
   ↓
Response
```

---

# 📂 Estructura del Proyecto

```
RubaStudioAPI/
│
├── src/
│   │
│   ├── config/
│   │   └── Configuración de servicios externos
│   │
│   ├── middlewares/
│   │   └── Validación y autenticación
│   │
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.controller.ts
│   │       ├── auth.routes.ts
│   │       ├── auth.schema.ts
│   │       └── auth.service.ts
│   │
│   ├── utils/
│   │   └── Utilidades JWT
│   │
│   └── server.ts
│
├── index.ts                # Entrada Serverless para Vercel
├── package.json
├── tsconfig.json
├── vercel.json
├── .env.example
└── .gitignore
```

---

# 📑 Endpoints

Todos los endpoints utilizan el prefijo:

```
/api/v1/auth
```

---

## 🔑 Login

### POST

```
/api/v1/auth/login
```

### Body

```json
{
  "email": "usuario@correo.com",
  "password": "password123"
}
```

### Response

```json
{
  "ok": true,
  "message": "Autenticación exitosa",
  "data": {
    "accessToken": "JWT_TOKEN",
    "usuario": {
      "uid": "id_usuario",
      "email": "usuario@correo.com",
      "rol": "admin"
    }
  }
}
```

---

## 🔄 Refresh Token

### POST

```
/api/v1/auth/refresh
```

Obtiene un nuevo Access Token utilizando la cookie de sesión.

---

## 👤 Perfil autenticado

### GET

```
/api/v1/auth/me
```

Requiere:

```
Authorization: Bearer <accessToken>
```

Respuesta:

```json
{
  "ok": true,
  "data": {
    "usuario": {}
  }
}
```

---

## 🚪 Logout

### POST

```
/api/v1/auth/logout
```

Cierra la sesión eliminando la cookie de refresh token.

---

# 💻 Instalación Local

## 1. Clonar repositorio

```bash
git clone https://github.com/Eroroshy/rubastudioapi.git
```

Entrar al proyecto:

```bash
cd rubastudioapi
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar variables de entorno

Crear archivo:

```
.env
```

basándose en:

```
.env.example
```

Ejemplo:

```env
JWT_PRIVATE_KEY_BASE64=
JWT_PUBLIC_KEY_BASE64=
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 4. Ejecutar entorno local

```bash
npm run dev
```

Servidor local:

```
http://localhost:4000
```

Healthcheck:

```
http://localhost:4000/health
```

---

# 🚀 Despliegue

El proyecto está preparado para ejecutarse como Serverless Function en Vercel.

Despliegue mediante CLI:

```bash
vercel --prod
```

o mediante integración con GitHub.

Las variables sensibles deben configurarse desde:

```
Vercel Dashboard
→ Project Settings
→ Environment Variables
```

---

# 🔐 Seguridad

Medidas implementadas:

* Las llaves RSA privadas y públicas no deben almacenarse directamente en código.
* Uso de variables de entorno para secretos.
* JWT firmado mediante algoritmo RS256.
* Validación de payloads utilizando Zod.
* Uso de cookies `httpOnly` para refresh tokens.
* Separación entre lógica de autenticación, rutas y servicios.

Archivos sensibles excluidos:

```
.env
*.key
serviceAccountKey.json
```

---

# 🛠️ Tecnologías Utilizadas

| Tecnología     | Uso                |
| -------------- | ------------------ |
| TypeScript     | Lenguaje principal |
| Node.js        | Runtime            |
| Express        | Framework API      |
| Vercel         | Hosting Serverless |
| JWT            | Autenticación      |
| RSA RS256      | Firma de tokens    |
| Zod            | Validación         |
| Firebase Admin | Servicios externos |

---

Desarrollado por **Erick Vargas**
GitHub: https://github.com/Eroroshy
