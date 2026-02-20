# ⚡ REVENAI — Revenue Intelligence Platform

> **Stop Revenue Leakage Before It Costs You.**

REVENAI is a zero-cost, production-ready AI Micro SaaS that detects financial leaks in subscription and SaaS revenue data. Upload a CSV → get executive-grade insights in seconds.

---

## What It Does

| Detector | What It Finds |
|---|---|
| **Isolation Forest** | Statistically anomalous invoices (outlier amounts, unusual timing) |
| **Revenue Drop Detection** | Monthly revenue declines exceeding 30% |
| **Duplicate Invoice Detection** | Same invoice billed multiple times |
| **Inactive High-Value Customers** | Top-quartile LTV customers who have gone silent |
| **Failed Payment Patterns** | Consecutive payment failures — early churn signal |

Every insight is computed from real data. No GPT. No paid APIs.

---

## Architecture

```
revenai/
├── backend/            FastAPI — async REST API, JWT auth, file upload
├── ai_engine/          Pandas + Scikit-learn analytics pipeline
├── frontend/           Next.js/ tailwindcss 
├── models/             SQLAlchemy ORM + Pydantic schemas
├── auth/               bcrypt + python-jose JWT
├── database/           Session factory (SQLite → Postgres swap-ready)
├── docker/             Dockerfiles for backend and frontend
├── sample_data/        Realistic CSV with intentional anomalies
├── tests/              pytest — backend + AI engine
├── docker-compose.yml
└── render.yaml         One-click Render deployment config
```

**Stack:** FastAPI · Next.js · SQLite/SQLAlchemy · Scikit-learn · JWT · Docker · Render

---

## 1-Minute Local Setup

### Prerequisites
- Python 3.11+
- pip

### Steps

```bash
# 1. Clone
git clone https://github.com/yourname/revenai.git
cd revenai

# 2. Create virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment
cp .env.example .env
# Edit .env if needed — defaults work for local dev

# 5. Start the backend (terminal 1)
uvicorn backend.main:app --reload --port 8000

# 6. Start the frontend (terminal 2)
streamlit run frontend/app.py

# 7. Open
# Dashboard:  http://localhost:8501
# API docs:   http://localhost:8000/docs
```

Register an account, upload `sample_data/revenue_sample.csv`, and see the anomalies.

---

## Docker Run (One Command)

```bash
# Build and boot both services
docker compose up --build

# Dashboard → http://localhost:8501
# API       → http://localhost:8000
```

No manual configuration required. The backend initialises its own SQLite database on first boot.

To stop:
```bash
docker compose down
```

---

## Running Tests

```bash
# From the project root, with venv active:
pytest

# Verbose output:
pytest -v

# Single file:
pytest tests/test_ai_engine.py -v
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./revenai.db` | DB connection string. Swap to Postgres in prod. |
| `JWT_SECRET_KEY` | `change-me-in-production` | **Must be overridden in production.** |
| `JWT_EXPIRE_MINUTES` | `60` | JWT token lifetime in minutes. |
| `ALLOWED_ORIGINS` | `*` | CORS allowed origins. Restrict in production. |
| `API_URL` | `http://localhost:8000` | Backend URL used by Streamlit frontend. |
| `PORT` | `8000` | Port the backend listens on. |

---

## Deploy to Render (Free Tier)

Render hosts both the API and frontend for free.

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial REVENAI commit"
git remote add origin https://github.com/yourname/revenai.git
git push -u origin main
```

### Step 2 — Deploy the Backend

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Set the following:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `JWT_SECRET_KEY` → click "Generate" or paste a random 64-char string
   - `DATABASE_URL` → `sqlite:///./revenai.db`
   - `ALLOWED_ORIGINS` → your frontend URL (set after step 3)
5. Deploy. Copy the backend URL (e.g. `https://revenai-backend.onrender.com`).

### Step 3 — Deploy the Frontend

1. **New Web Service** → same repo
2. Set:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `streamlit run frontend/app.py --server.port $PORT --server.address 0.0.0.0 --server.headless true`
3. Add environment variable:
   - `API_URL` → the backend URL from Step 2
4. Deploy.

### Step 4 — Link Backend CORS

Back in the backend service, update `ALLOWED_ORIGINS` to the frontend URL.

> **Note:** Render free tier services sleep after 15 minutes of inactivity. First request after sleep takes ~30s. Upgrade to a paid plan ($7/month) to eliminate cold starts.

### Alternative: Use `render.yaml` (Blueprint Deploy)

```bash
# Push to GitHub, then in Render:
# New → Blueprint → connect repo → Render reads render.yaml automatically
```
Update the `API_URL` in `render.yaml` to your actual backend URL before deploying.

---

## Postgres Migration (When You're Ready to Scale)

The only change needed:

```bash
# In .env or Render environment variables:
DATABASE_URL=postgresql://user:password@host:5432/revenai
```

Add `psycopg2-binary` to `requirements.txt`. SQLAlchemy handles the rest — no model changes required.

---

## Sample Data

`sample_data/revenue_sample.csv` contains 130+ realistic invoice rows intentionally seeded with:

- Duplicate invoices (billing errors)
- Customers with 2–4 consecutive failed payments
- High-value customers inactive for 90+ days
- An extreme outlier invoice ($88,000) to trigger Isolation Forest
- Month-over-month revenue patterns

Use this file to demo the product immediately.

---

## API Reference

Full Swagger UI available at `/docs` when the backend is running.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Liveness probe |
| `POST` | `/auth/register` | — | Create account |
| `POST` | `/auth/login` | — | Get JWT token |
| `POST` | `/analysis/upload` | Bearer | Upload CSV + run analysis |
| `GET` | `/analysis/{id}/report` | Bearer | Fetch full insight report |
| `GET` | `/analysis/` | Bearer | List user's analyses |

---

## Roadmap Ideas

- Stripe webhook integration — real-time payment failure alerts
- Email digest: weekly revenue health report
- Postgres + multi-tenant data isolation
- ChartJS revenue trend visualization in frontend
- Exportable PDF executive report

---

## License

MIT. Build, fork, ship. ⚡
