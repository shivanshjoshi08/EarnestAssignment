# Task Management System - Software Engineering Assessment

This repository contains a full-stack Task Management System built for the Full-Stack Engineer assessment track. It strictly adheres to all architectural requirements and provides a premium, responsive UI without relying on heavy external styling libraries.

## Architecture & Tech Stack

This project is divided into two decoupled layers:

### Backend Layer (`/backend`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite (Ideal for zero-configuration testing). Can easily be swapped to PostgreSQL in `schema.prisma`.
- **ORM:** Prisma
- **Security & Authentication:** 
  - JWT Access Tokens (short-lived, 15m) returned to client in-memory.
  - JWT Refresh Tokens (long-lived, 7d) stored securely in `HttpOnly` cookies.
  - Passwords hashed using `bcrypt` (12 rounds).
  - Robust request validation using `Zod`.

### Frontend Layer (`/frontend`)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS Modules with a carefully crafted design system (Dark Mode). **No TailwindCSS.**
- **Features:** 
  - Real-time client-side fetching with automatic, silent Token Refresh.
  - Custom UI Components (Toasts, Modals, Responsive Grids).
  - Debounced search & filter pipelines.

## Project Setup Instructions

The application consists of two decoupled services. You will need two terminal windows.

### 1. Backend Setup

Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
```

Set up your `.env` file (one is already provided out of the box in the codebase `backend/.env` with defaults for fast evaluation).

Run database migrations to generate the SQLite file and Prisma client:
```bash
npx prisma db push
```

Start the backend server in development mode:
```bash
npm run dev
```
*The backend will start on `http://localhost:5000`.*

### 2. Frontend Setup

Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
```

Start the frontend server:
```bash
npm run dev
```
*The frontend will start on `http://localhost:3000`.*

## Features Implemented

- **Authentication System:** Register, Login, Logout, and Token Auto-Refresher protecting the API.
- **Task Dashboard:** A premium, fully responsive UI.
- **CRUD Functionality:** Create, Update, Delete, and Toggle task statuses.
- **Advanced Lists:** Features pagination, status filtering, and title/description search securely built into the backend Prisma querying layer.
- **Polished UX:** Feedback mechanisms via Toast Notifications, Loaders, and Empty States.

## Deployment Readiness

This architecture is optimized for cloud deployment:
- **Backend:** Ready for deployment on **Render**, **Railway**, or **Fly.io**. To use a real PostgreSQL database, update the `provider` in `backend/prisma/schema.prisma` from `sqlite` to `postgresql` and provide a valid `DATABASE_URL`.
- **Frontend:** Ready for one-click deployment on **Vercel** or **Netlify**. Ensure `NEXT_PUBLIC_API_URL` is set to the live backend domain.
