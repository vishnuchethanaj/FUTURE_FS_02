# Mini CRM — Client Lead Management System

A simple full-stack CRM built with the MERN stack. Designed to be clean,
beginner-friendly, and easy to edit in VS Code.

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios, plain CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt

## Project Structure

```
client/                React + Vite frontend
  src/
    components/        Reusable UI (Sidebar, Modal, LeadForm, etc.)
    pages/             Route pages (Login, Dashboard, Leads, LeadDetail, Profile)
    services/          Axios API wrappers
    App.jsx
    main.jsx
server/                Express + MongoDB backend
  config/              Database connection
  controllers/         Route handlers
  middleware/          JWT auth
  models/              Mongoose schemas (User, Lead)
  routes/              Express routers
  server.js
  seed.js              Creates an initial admin user
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance (local `mongodb://127.0.0.1:27017` or MongoDB Atlas)

## Setup

### 1. Backend

```bash
cd server
cp .env.example .env       # edit MONGO_URI and JWT_SECRET
npm install
npm run seed               # creates admin@crm.com / admin123
npm run dev                # starts API on http://localhost:5000
```

### 2. Frontend

In a second terminal:

```bash
cd client
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                # opens http://localhost:5173
```

### 3. Log in

- Email: `admin@crm.com`
- Password: `admin123`

You can create more admins via `POST /api/auth/register`.

## API Reference

All `/api/leads/*` routes require `Authorization: Bearer <token>`.

| Method | Path                       | Purpose                |
| ------ | -------------------------- | ---------------------- |
| POST   | `/api/auth/login`          | Log in, returns token  |
| POST   | `/api/auth/register`       | Create a user          |
| GET    | `/api/auth/me`             | Current user           |
| GET    | `/api/leads`               | List leads (search, status filters) |
| GET    | `/api/leads/:id`           | Get one lead           |
| POST   | `/api/leads`               | Create lead            |
| PUT    | `/api/leads/:id`           | Update lead            |
| DELETE | `/api/leads/:id`           | Delete lead            |
| PATCH  | `/api/leads/:id/status`    | Update status          |
| POST   | `/api/leads/:id/notes`     | Add a note             |

## Features

- JWT-protected admin login
- Dashboard with totals + recent leads + upcoming follow-ups
- Leads table with search + status filter
- Add / Edit / Delete leads via modal form
- Lead detail page with status update + timestamped notes
- Responsive layout, light theme, soft blue accents

## Notes for VS Code / GitHub export

Both `client/` and `server/` are standalone npm projects with their own
`package.json`. Run `npm install` in each. No monorepo tooling required.
