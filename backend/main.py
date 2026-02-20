"""
REVENAI Backend — FastAPI Application Entry Point
"""

import logging
import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes_auth import router as auth_router
from backend.routes_analysis import router as analysis_router
from database.session import init_db

# ─── Logging ────────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger("revenai")


# ─── Lifespan ───────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator:
    """Startup → init DB; Shutdown → cleanup if needed."""
    logger.info("REVENAI starting up — initialising database")
    init_db()
    logger.info("Database ready")
    yield
    logger.info("REVENAI shutting down")


# ─── App ────────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="REVENAI",
    description="AI Revenue Intelligence — Stop Revenue Leakage Before It Costs You.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS — tighten ALLOWED_ORIGINS in production
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ────────────────────────────────────────────────────────────────────

app.include_router(auth_router)
app.include_router(analysis_router)


# ─── Health ─────────────────────────────────────────────────────────────────────

@app.get("/health", tags=["System"])
async def health() -> dict:
    """Liveness probe — returns 200 when the service is up."""
    return {"status": "ok", "service": "revenai"}


# ─── Dev runner ─────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
