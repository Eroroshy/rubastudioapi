# 🔒 RubaStudio Auth API

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge\&logo=vercel\&logoColor=white)](https://rubastudioapi-eroroshy-eroroshy.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)](https://expressjs.com/)

API Serverless desarrollada en **TypeScript + Express** para la gestión de autenticación y sesiones de **RubaStudio**.

Implementa un sistema completo de autenticación utilizando **JWT con firma RSA RS256**, manejo seguro de sesiones mediante cookies `httpOnly`, validación de datos con **Zod** y una arquitectura modular preparada para despliegue en la nube mediante **Vercel Serverless Functions**.

---

# 🌐 URL de Producción

```
https://rubastudioapi-eroroshy-eroroshy.vercel.app
```

---

# 📌 Tabla de Contenidos

* [Características](#-características)
* [Arquitectura](#-arquitectura)
* [Estructura del Proyecto](#-estructura-del-proyecto)
* [Endpoints](#-endpoints)
* [Instalación Local](#-instalación-local)
* [Variables de Entorno](#-variables-de-entorno)
* [Despliegue](#-despliegue)
* [Seguridad](#-seguridad)
* [Tecnologías](#-tecnologías)

---

# 🚀 Características

* ⚡ **Arquitectura Serverless:** desplegada utilizando Vercel Functions.
* 🔐 **Autenticación basada en JWT:** tokens firmados mediante RSA con algoritmo RS256.
* 🔑 **Llaves asimétricas:** uso de llave privada para firma y llave pública para validación.
* 🍪 **Sesiones seguras:** refresh tokens almacenados mediante cookies `httpOnly`.
* 🔄 **Renovación silenciosa:** generación de nuevos Access Tokens mediante Refresh Tokens.
* 🛡️ **Validación con Zod:** rechazo de información inválida antes de ejecutar la lógica principal.
* 📦 **Arquitectura modular:** separación entre rutas, controladores, servicios y utilidades.
* 📘 **TypeScript Strict Mode:** tipado fuerte para mayor seguridad y mantenibilidad.

---

# 🏗️ Arquitectura

La API sigue una arquitectura modular basada en capas:

```
Cliente
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
JWT / Servicios externos
   |
   ↓
Respuesta HTTP
```

Flujo de autenticación:

```
Usuario
   |
   | email + password
   ↓
Auth Controller
   |
   ↓
Validación Zod
   |
   ↓
Generación JWT RS256
   |
   ↓
Access Token + Refresh Cookie
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
│   │   └── Middleware de autenticación y validación
│   │
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.controller.ts
│   │       ├── auth.routes.ts
│   │       ├── auth.schema.ts
│   │       └── auth.service.ts
│   │
│   ├── utils/
│   │   └── Funciones auxiliares JWT
│   │
│   └── server.ts
│
├── index.ts              # Entrada Serverless para Vercel
├── package.json
├── package-lock.json
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

### Request

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
      "uid": "usuario_id",
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

Utiliza la cookie `httpOnly` del Refresh Token para generar un nuevo Access Token.

Respuesta:

```json
{
  "ok": true,
  "data": {
    "accessToken": "JWT_TOKEN"
  }
}
```

---

## 👤 Obtener perfil

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

Elimina la sesión activa y limpia la cookie del Refresh Token.

Respuesta:

```json
{
  "ok": true,
  "message": "Sesión cerrada correctamente"
}
```

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

Crear:

```
.env
```

basado en:

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

## 4. Ejecutar en desarrollo

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

El proyecto está configurado para ejecutarse en Vercel mediante una función Serverless.

Configuración:

```
index.ts
      |
      ↓
src/server.ts
      |
      ↓
Express Application
```

Despliegue manual:

```bash
vercel --prod
```

También puede desplegarse automáticamente mediante integración con GitHub.

Las variables sensibles deben configurarse desde:

```
Vercel Dashboard
→ Project Settings
→ Environment Variables
```

---

# 🔐 Seguridad

Implementaciones de seguridad:

* JWT firmado mediante algoritmo RSA RS256.
* Separación entre llave privada y llave pública.
* Variables sensibles manejadas mediante entorno.
* Cookies `httpOnly` para Refresh Tokens.
* Validación de datos con Zod.
* Middleware de protección de rutas.
* Separación de responsabilidades mediante arquitectura modular.

Archivos excluidos del repositorio:

```
.env
*.key
serviceAccountKey.json
node_modules/
dist/
```

---

# 🛠️ Tecnologías

| Tecnología     | Uso                  |
| -------------- | -------------------- |
| TypeScript     | Lenguaje principal   |
| Node.js        | Runtime              |
| Express        | Framework HTTP       |
| Vercel         | Hosting Serverless   |
| JWT            | Autenticación        |
| RSA RS256      | Firma de tokens      |
| Zod            | Validación           |
| Firebase Admin | Servicios externos   |
| GitHub         | Control de versiones |

---

# 👨‍💻 Autor

Desarrollado por **Erick Vargas**

GitHub:

https://github.com/Eroroshy
