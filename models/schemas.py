"""
Pydantic schemas — request validation + response serialization.
"""

from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr, Field


# ─── Auth ──────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: Optional[str] = None


class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ─── Insights ──────────────────────────────────────────────────────────────────

class Anomaly(BaseModel):
    customer_id: str
    invoice_id: str
    amount: float
    reason: str
    severity: str  # high | medium | low


class RevenueDrop(BaseModel):
    period: str
    previous_revenue: float
    current_revenue: float
    drop_pct: float
    estimated_loss: float
    message: str


class DuplicateInvoice(BaseModel):
    invoice_id: str
    customer_id: str
    amount: float
    occurrences: int
    message: str


class InactiveCustomer(BaseModel):
    customer_id: str
    last_payment_date: str
    days_inactive: int
    lifetime_value: float
    risk_level: str
    message: str


class FailedPaymentPattern(BaseModel):
    customer_id: str
    consecutive_failures: int
    amount_at_risk: float
    message: str


class SummaryMetrics(BaseModel):
    total_revenue: float
    total_invoices: int
    unique_customers: int
    paid_invoices: int
    failed_invoices: int
    payment_success_rate: float
    avg_invoice_value: float
    anomalies_detected: int


class InsightReport(BaseModel):
    summary: SummaryMetrics
    revenue_drops: List[RevenueDrop]
    anomalies: List[Anomaly]
    duplicate_invoices: List[DuplicateInvoice]
    inactive_customers: List[InactiveCustomer]
    failed_payment_patterns: List[FailedPaymentPattern]
    generated_at: datetime


# ─── Analysis ──────────────────────────────────────────────────────────────────

class AnalysisOut(BaseModel):
    id: int
    filename: str
    row_count: Optional[int]
    total_revenue: Optional[float]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
