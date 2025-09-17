# Patient Registration App - Setup Guide

Este markdown complementa la consigna del challenge y explica cómo levantar el proyecto de manera local, qué contenedores se crean en Docker, en qué direcciones quedan disponibles y cómo conectarse al motor de la Base de Datos.

---

## Requisitos previos

- Node.js >= 20 (o versión definida en el proyecto)
- Docker
- Git
- Cliente PostgreSQL (DBeaver, TablePlus, pgAdmin, psql)

---

## Tech Stack

Backend: Node con NestJS

Frontend: React con Vite + Tailwind

Base de Datos: PostgreSQL

Testing: Jest

---

## Levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Ger215/lightit-fullstack-challenge.git

cd lightit-fullstack-challenge
```

### 2. Instalar Dependencias

```bash
# Backend
cd patient-registration-backend
npm install # o yarn install

# Frontend
cd patient-registration-frontend
npm install # o yarn install
```

### 3. Levantar contenedores de Docker

```bash
docker-compose up -d
```

Por Docker se levantan los siguientes servicios:

| Servicio      | URL Local                                      | Descripción                       |
| ------------- | ---------------------------------------------- | --------------------------------- |
| Backend (API) | [http://localhost:3000](http://localhost:3000) | API REST para registrar pacientes |
| Frontend      | [http://localhost:5173](http://localhost:5173) | Web App                           |
| PostgreSQL DB | localhost:5432                                 | Base de Datos PostgreSQL          |

---

### Base de Datos

- Motor: PostgreSQL

- Host: localhost

- Database: patients

- Puerto: 5432

- User: postgres

- Password: postgres

---

### Endpoints implementados

- GET /patients → Obtener todos los Pacientes

- POST /patients → Crear paciente

Los requests se hacen contra el Backend:
http://localhost:3000

---

### Emails de confirmación

Se realiza de forma asincrónica a través de Mailer utilizando el SMTP de Gmail para el envío de correos.

---

### Notas adicionales

- El proyecto está desarrollado para en un futuro agregar notificaciones por SMS.

- Las variables de entorno están definidas dentro del docker-compose

```bash
# .env.example
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=patients

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dummymail@gmail.com
SMTP_PASS=dummypass
```
