# RevenAI — Stop Revenue Leakage Before It Impacts Growth

RevenAI is an AI-powered revenue protection platform built for fintech and B2B subscription companies.

We help organizations proactively detect hidden revenue risks, eliminate silent losses, and protect recurring income — before they impact growth, valuation, or trust.



---

## 🚀 Product Vision

Recurring revenue businesses operate at scale. Small inefficiencies compound into significant losses.

RevenAI applies intelligent risk detection models to subscription and transaction data to surface:

- Revenue leakage patterns  
- Payment failure risks  
- Customer churn probability  
- Behavioral anomalies impacting income  

Our focus is measurable financial protection — not vanity analytics.

---

## 🎯 Target Users

Built specifically for:

- Fintech companies  
- B2B SaaS & subscription businesses  
- Revenue operations teams  
- Product & growth leaders  
- CFOs and finance strategy teams  

If recurring revenue is core to your business model, RevenAI is designed for you.

---

## 🧠 Core Capabilities

- AI-based revenue risk detection
- Churn probability modeling
- Predictive failure analysis
- Intelligent financial pattern recognition
- Secure authentication (JWT-based)
- Clean, production-ready dashboard experience (Desktop optimized)

---

## 🏗 Architecture

```
revenai/
├── backend/           FastAPI — AI & Business Logic Engine
│   ├── api/           API Routes
│   ├── models/        ML Models
│   ├── services/      Risk & Prediction Logic
│   └── core/          Config & Security
│
├── frontend/          Next.js 14 + Tailwind CSS — Production UI
│
├── docker-compose.yml
└── README.md
```

**Stack:**  
FastAPI · Next.js 14 · Tailwind CSS · SQLite/SQLAlchemy · Scikit-learn · JWT · Docker · Render

---

## ⚙️ 1-Minute Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/revenai.git
cd revenai
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

Backend runs on:  
http://localhost:8000  
Docs: http://localhost:8000/docs

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:  
http://localhost:3000

---

## 🐳 Docker (Full Stack)

```bash
docker-compose up --build
```

- Frontend → http://localhost:3000  
- API → http://localhost:8000  

---

## 🌍 Deployment (Render)

### Backend

- Environment: Python
- Start Command:
  ```
  uvicorn main:app --host 0.0.0.0 --port 10000
  ```
- Add environment variables in Render dashboard

### Frontend

- Root Directory: `frontend`
- Environment: Node
- Build Command:
  ```
  npm install && npm run build
  ```
- Start Command:
  ```
  npm start
  ```
- Add:
  ```
  NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
  ```

---

## 🔐 Environment Variables

| Variable | Example | Description |
|-----------|----------|------------|
| SECRET_KEY | random_secret | JWT security key |
| DATABASE_URL | sqlite:///./revenai.db | Database connection |
| NEXT_PUBLIC_API_URL | http://localhost:8000 | Backend API URL for frontend |

---

## 💡 Product Philosophy

AI should not exist for experimentation alone.

At RevenAI, we build applied intelligence systems that:

- Protect financial integrity  
- Scale with business growth  
- Translate data into measurable outcomes  
- Deliver operational confidence  

This product is desktop-optimized for professional workflows.

---

## 📈 Roadmap

- Advanced anomaly detection
- Multi-tenant enterprise architecture
- Stripe & fintech API integrations
- Revenue health scoring
- Predictive retention intelligence
- Role-based enterprise access control

---

## 🤝 Contributing

This is an actively evolving AI product.  
Pull requests, architecture discussions, and AI system improvements are welcome.

---

## 📩 Contact — AI Product Collaboration

Interested in:

- AI product strategy
- Revenue intelligence systems
- Fintech AI solutions
- Building production-grade AI platforms

Let’s connect.

📧 Email: uzainmohid@gmail.com
🌐 LinkedIn: https://linkedin.com/in/uzainmohid 
💼 Open to AI Product Leadership opportunities and collaborations

---

## License

MIT License
