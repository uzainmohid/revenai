# ⚡ REVENAI Web — Next.js Frontend v2.0

> Stop Revenue Leakage Before It Makes Loss.

## Quick Start — Run in 3 commands

```bash
# 1. Copy env file
cp .env.example .env.local

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open **http://localhost:3000**

---

## Full Setup Guide

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- REVENAI FastAPI backend running on port 8000

### Step 1 — Install Node.js (if not installed)
Download from https://nodejs.org — choose "LTS" version

### Step 2 — Set up environment
```bash
cp .env.example .env.local
```
The default `.env.local` already points to `http://localhost:8000` — no changes needed for local dev.

### Step 3 — Install dependencies
```bash
npm install
```
Wait for this to complete (1–2 minutes first time).

### Step 4 — Run both backend and frontend

**Terminal 1 — FastAPI Backend (from revenai/ root):**
```bash
.venv\Scripts\activate
uvicorn backend.main:app --reload --port 8000
```

**Terminal 2 — Next.js Frontend (from this folder):**
```bash
npm run dev
```

### Step 5 — Open browser
- Frontend: http://localhost:3000
- Backend API docs: http://localhost:8000/docs

---

## Deploy to Production

### Frontend → Vercel (free)
```bash
npm install -g vercel
vercel
```
Set environment variable on Vercel dashboard:
- Key: `NEXT_PUBLIC_API_URL`
- Value: your backend URL on Render

### Backend → already on Render
No changes needed.

---

## Project Structure
```
revenai-next/
├── app/
│   ├── (auth)/           Login + Register
│   ├── (app)/            Protected dashboard
│   └── globals.css       All styles
├── components/
│   ├── auth/             LoginForm, RegisterForm
│   ├── layout/           AppShell, Sidebar, TopBar
│   ├── dashboard/        AnalysesView
│   ├── upload/           UploadView (3-stage AI flow)
│   └── report/           ReportView (full report)
├── lib/
│   ├── api/              HTTP client + endpoints
│   ├── hooks/            React Query hooks
│   ├── schemas/          Zod validation
│   └── utils.ts          Formatters
├── store/                Zustand auth
├── tailwind.config.js    Plain JS — works on all Node versions
├── next.config.mjs       Plain MJS — works on all Node versions
└── postcss.config.js     Plain JS
```
