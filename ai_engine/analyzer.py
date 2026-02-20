"""
REVENAI — AI Engine
Real deterministic revenue intelligence using scikit-learn + pandas.
No fake AI. Every insight is computed from actual data.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import List

import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

from models.schemas import (
    Anomaly,
    DuplicateInvoice,
    FailedPaymentPattern,
    InactiveCustomer,
    InsightReport,
    RevenueDrop,
    SummaryMetrics,
)

logger = logging.getLogger(__name__)

# ─── Constants ──────────────────────────────────────────────────────────────────

REVENUE_DROP_THRESHOLD = 0.30          # 30% drop triggers alert
INACTIVE_DAYS_THRESHOLD = 90           # >90 days = inactive
HIGH_VALUE_PERCENTILE = 0.75           # top 25% of LTV = "high-value"
CONSECUTIVE_FAILURES_THRESHOLD = 2    # 2+ failures in a row = pattern
ISOLATION_FOREST_CONTAMINATION = 0.08 # ~8% anomaly rate assumption


# ─── Data Loading ───────────────────────────────────────────────────────────────

def load_and_validate(file_bytes: bytes) -> pd.DataFrame:
    """
    Parse CSV bytes into a clean DataFrame.
    Raises ValueError with a human-readable message on bad data.
    """
    import io

    required_columns = {
        "customer_id", "invoice_id", "amount",
        "status", "subscription_date", "last_payment_date",
    }

    try:
        df = pd.read_csv(io.BytesIO(file_bytes))
    except Exception as exc:
        raise ValueError(f"Could not parse CSV: {exc}") from exc

    missing = required_columns - set(df.columns.str.lower())
    if missing:
        raise ValueError(f"CSV missing required columns: {', '.join(sorted(missing))}")

    # Normalise column names
    df.columns = df.columns.str.lower().str.strip()

    # Type coercion
    df["amount"] = pd.to_numeric(df["amount"], errors="coerce").fillna(0.0)
    df["last_payment_date"] = pd.to_datetime(df["last_payment_date"], errors="coerce")
    df["subscription_date"] = pd.to_datetime(df["subscription_date"], errors="coerce")
    df["status"] = df["status"].str.lower().str.strip()
    df["customer_id"] = df["customer_id"].astype(str).str.strip()
    df["invoice_id"] = df["invoice_id"].astype(str).str.strip()

    df.dropna(subset=["last_payment_date", "customer_id", "invoice_id"], inplace=True)

    if df.empty:
        raise ValueError("CSV contains no valid data rows after cleaning.")

    return df


# ─── Summary Metrics ────────────────────────────────────────────────────────────

def compute_summary(df: pd.DataFrame) -> SummaryMetrics:
    """High-level financial summary across the full dataset."""
    paid = df[df["status"] == "paid"]
    failed = df[df["status"] == "failed"]
    total_rev = paid["amount"].sum()
    success_rate = len(paid) / len(df) * 100 if len(df) > 0 else 0.0

    return SummaryMetrics(
        total_revenue=round(total_rev, 2),
        total_invoices=len(df),
        unique_customers=df["customer_id"].nunique(),
        paid_invoices=len(paid),
        failed_invoices=len(failed),
        payment_success_rate=round(success_rate, 1),
        avg_invoice_value=round(paid["amount"].mean(), 2) if not paid.empty else 0.0,
        anomalies_detected=0,  # updated after anomaly pass
    )


# ─── Revenue Drop Detection ─────────────────────────────────────────────────────

def detect_revenue_drops(df: pd.DataFrame) -> List[RevenueDrop]:
    """
    Computes monthly revenue and flags periods where revenue dropped
    by more than REVENUE_DROP_THRESHOLD compared to the prior month.
    """
    paid = df[df["status"] == "paid"].copy()
    if paid.empty:
        return []

    paid["month"] = paid["last_payment_date"].dt.to_period("M")
    monthly = paid.groupby("month")["amount"].sum().sort_index()

    if len(monthly) < 2:
        return []

    drops: List[RevenueDrop] = []
    for i in range(1, len(monthly)):
        prev_rev = monthly.iloc[i - 1]
        curr_rev = monthly.iloc[i]
        if prev_rev == 0:
            continue
        drop_pct = (prev_rev - curr_rev) / prev_rev
        if drop_pct >= REVENUE_DROP_THRESHOLD:
            loss = prev_rev - curr_rev
            period_label = str(monthly.index[i])
            drops.append(
                RevenueDrop(
                    period=period_label,
                    previous_revenue=round(prev_rev, 2),
                    current_revenue=round(curr_rev, 2),
                    drop_pct=round(drop_pct * 100, 1),
                    estimated_loss=round(loss, 2),
                    message=(
                        f"Revenue dropped {drop_pct * 100:.1f}% in {period_label} "
                        f"— estimated loss: ${loss:,.2f}"
                    ),
                )
            )

    return drops


# ─── Anomaly Detection (Isolation Forest) ──────────────────────────────────────

def detect_anomalies(df: pd.DataFrame) -> List[Anomaly]:
    """
    Uses Isolation Forest on numerical features to surface
    statistically unusual invoices (outliers in amount, timing, etc.).
    """
    paid = df[df["status"] == "paid"].copy()
    if len(paid) < 10:
        return []

    ref_date = paid["last_payment_date"].max()
    paid["days_since"] = (ref_date - paid["last_payment_date"]).dt.days

    features = paid[["amount", "days_since"]].fillna(0)

    clf = IsolationForest(
        n_estimators=100,
        contamination=ISOLATION_FOREST_CONTAMINATION,
        random_state=42,
    )
    paid = paid.copy()
    paid["anomaly_score"] = clf.fit_predict(features)
    paid["raw_score"] = clf.decision_function(features)

    outliers = paid[paid["anomaly_score"] == -1].copy()
    outliers = outliers.sort_values("raw_score")

    anomalies: List[Anomaly] = []
    median_amount = paid["amount"].median()

    for _, row in outliers.iterrows():
        if row["amount"] > median_amount * 5:
            reason = f"Invoice amount ${row['amount']:,.2f} is far above median (${median_amount:,.2f})"
            severity = "high"
        elif row["amount"] < median_amount * 0.1:
            reason = f"Unusually low invoice of ${row['amount']:,.2f} vs median ${median_amount:,.2f}"
            severity = "medium"
        else:
            reason = f"Atypical payment timing or amount pattern detected"
            severity = "low"

        anomalies.append(
            Anomaly(
                customer_id=str(row["customer_id"]),
                invoice_id=str(row["invoice_id"]),
                amount=round(row["amount"], 2),
                reason=reason,
                severity=severity,
            )
        )

    return anomalies


# ─── Duplicate Invoice Detection ────────────────────────────────────────────────

def detect_duplicate_invoices(df: pd.DataFrame) -> List[DuplicateInvoice]:
    """
    Finds invoice_ids that appear more than once — a clear billing error signal.
    """
    counts = df.groupby("invoice_id").size().reset_index(name="count")
    dupes = counts[counts["count"] > 1]

    results: List[DuplicateInvoice] = []
    for _, row in dupes.iterrows():
        inv_id = row["invoice_id"]
        matches = df[df["invoice_id"] == inv_id].iloc[0]
        results.append(
            DuplicateInvoice(
                invoice_id=inv_id,
                customer_id=str(matches["customer_id"]),
                amount=round(float(matches["amount"]), 2),
                occurrences=int(row["count"]),
                message=(
                    f"Invoice {inv_id} appears {row['count']}x "
                    f"— potential duplicate billing of ${matches['amount']:,.2f}"
                ),
            )
        )

    return results


# ─── Inactive High-Value Customers ──────────────────────────────────────────────

def detect_inactive_high_value_customers(
    df: pd.DataFrame,
) -> List[InactiveCustomer]:
    """
    Identifies high-LTV customers who haven't paid recently.
    These are churn risks with material revenue impact.
    """
    paid = df[df["status"] == "paid"]
    if paid.empty:
        return []

    ref_date = df["last_payment_date"].max()
    cutoff = ref_date - timedelta(days=INACTIVE_DAYS_THRESHOLD)

    ltv = paid.groupby("customer_id")["amount"].sum()
    last_payment = paid.groupby("customer_id")["last_payment_date"].max()

    ltv_threshold = ltv.quantile(HIGH_VALUE_PERCENTILE)

    inactive: List[InactiveCustomer] = []
    for cust_id, last_date in last_payment.items():
        if last_date < cutoff and ltv.get(cust_id, 0) >= ltv_threshold:
            days_inactive = (ref_date - last_date).days
            customer_ltv = float(ltv.get(cust_id, 0))
            risk = "critical" if days_inactive > 180 else "high"
            inactive.append(
                InactiveCustomer(
                    customer_id=str(cust_id),
                    last_payment_date=last_date.strftime("%Y-%m-%d"),
                    days_inactive=days_inactive,
                    lifetime_value=round(customer_ltv, 2),
                    risk_level=risk,
                    message=(
                        f"High-value customer {cust_id} (LTV: ${customer_ltv:,.2f}) "
                        f"has been inactive for {days_inactive} days — churn risk"
                    ),
                )
            )

    inactive.sort(key=lambda x: x.days_inactive, reverse=True)
    return inactive


# ─── Failed Payment Pattern Detection ───────────────────────────────────────────

def detect_failed_payment_patterns(df: pd.DataFrame) -> List[FailedPaymentPattern]:
    """
    Flags customers with consecutive failed payments — early churn signal.
    """
    df_sorted = df.sort_values(["customer_id", "last_payment_date"])
    patterns: List[FailedPaymentPattern] = []

    for cust_id, group in df_sorted.groupby("customer_id"):
        statuses = group["status"].tolist()
        consecutive = 0
        for s in reversed(statuses):
            if s == "failed":
                consecutive += 1
            else:
                break

        if consecutive >= CONSECUTIVE_FAILURES_THRESHOLD:
            amount_at_risk = group[group["status"] == "failed"]["amount"].sum()
            patterns.append(
                FailedPaymentPattern(
                    customer_id=str(cust_id),
                    consecutive_failures=consecutive,
                    amount_at_risk=round(float(amount_at_risk), 2),
                    message=(
                        f"Customer {cust_id} has {consecutive} consecutive failed payments "
                        f"— ${amount_at_risk:,.2f} at risk of permanent loss"
                    ),
                )
            )

    patterns.sort(key=lambda x: x.amount_at_risk, reverse=True)
    return patterns


# ─── Orchestrator ────────────────────────────────────────────────────────────────

def run_analysis(file_bytes: bytes) -> InsightReport:
    """
    Full pipeline: load CSV → run all detectors → return InsightReport.
    This is the single entry point called by the FastAPI route.
    """
    logger.info("Starting revenue analysis pipeline")

    df = load_and_validate(file_bytes)
    logger.info("Loaded %d rows from CSV", len(df))

    summary = compute_summary(df)
    revenue_drops = detect_revenue_drops(df)
    anomalies = detect_anomalies(df)
    duplicates = detect_duplicate_invoices(df)
    inactive = detect_inactive_high_value_customers(df)
    failed_patterns = detect_failed_payment_patterns(df)

    summary.anomalies_detected = len(anomalies)

    report = InsightReport(
        summary=summary,
        revenue_drops=revenue_drops,
        anomalies=anomalies,
        duplicate_invoices=duplicates,
        inactive_customers=inactive,
        failed_payment_patterns=failed_patterns,
        generated_at=datetime.utcnow(),
    )

    logger.info(
        "Analysis complete — anomalies=%d drops=%d duplicates=%d",
        len(anomalies),
        len(revenue_drops),
        len(duplicates),
    )

    return report
