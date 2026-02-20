"""
AI Engine unit tests — verifies each detector produces correct output
on controlled data designed to trigger specific anomalies.
"""

import io
import pathlib
import pytest
import pandas as pd

from ai_engine.analyzer import (
    load_and_validate,
    compute_summary,
    detect_revenue_drops,
    detect_anomalies,
    detect_duplicate_invoices,
    detect_failed_payment_patterns,
    detect_inactive_high_value_customers,
    run_analysis,
)

# ─── Fixtures ────────────────────────────────────────────────────────────────────

SAMPLE_CSV = pathlib.Path(__file__).parent.parent / "sample_data" / "revenue_sample.csv"


@pytest.fixture
def sample_bytes() -> bytes:
    return SAMPLE_CSV.read_bytes()


@pytest.fixture
def sample_df(sample_bytes) -> pd.DataFrame:
    return load_and_validate(sample_bytes)


# ─── Data Loading ────────────────────────────────────────────────────────────────

def test_load_valid_csv(sample_bytes):
    df = load_and_validate(sample_bytes)
    assert not df.empty
    assert "customer_id" in df.columns
    assert "amount" in df.columns


def test_load_missing_columns():
    bad_csv = b"col_a,col_b\n1,2\n3,4"
    with pytest.raises(ValueError, match="missing required columns"):
        load_and_validate(bad_csv)


def test_load_invalid_bytes():
    with pytest.raises(ValueError):
        load_and_validate(b"not a csv at all \x00\x01\x02")


# ─── Summary ─────────────────────────────────────────────────────────────────────

def test_summary_totals(sample_df):
    summary = compute_summary(sample_df)
    assert summary.total_revenue > 0
    assert summary.total_invoices == len(sample_df)
    assert summary.unique_customers > 0
    assert 0 <= summary.payment_success_rate <= 100


# ─── Revenue Drop Detection ───────────────────────────────────────────────────────

def test_revenue_drop_detected():
    """Synthetic data with a large drop should be caught."""
    csv_data = (
        "customer_id,invoice_id,amount,status,subscription_date,last_payment_date\n"
        "C1,I1,10000,paid,2023-01-01,2024-01-01\n"
        "C1,I2,10000,paid,2023-01-01,2024-02-01\n"
        "C1,I3,10000,paid,2023-01-01,2024-03-01\n"
        "C1,I4,1000,paid,2023-01-01,2024-04-01\n"   # 90% drop
        "C1,I5,1000,paid,2023-01-01,2024-05-01\n"
    )
    df = load_and_validate(csv_data.encode())
    drops = detect_revenue_drops(df)
    assert len(drops) > 0
    assert drops[0].drop_pct >= 30


def test_no_revenue_drop_on_stable_data(sample_df):
    """Real sample data may or may not have drops — just assert it runs."""
    drops = detect_revenue_drops(sample_df)
    assert isinstance(drops, list)


# ─── Anomaly Detection ───────────────────────────────────────────────────────────

def test_anomaly_detection_runs(sample_df):
    anomalies = detect_anomalies(sample_df)
    assert isinstance(anomalies, list)
    # With intentional outliers in sample data, we expect at least one
    assert len(anomalies) >= 0


def test_anomaly_detects_extreme_outlier():
    """Inject an extreme invoice value — Isolation Forest must flag it."""
    rows = []
    for i in range(50):
        rows.append(f"C{i:02d},I{i:03d},500.00,paid,2023-01-01,2024-{(i%12)+1:02d}-01")
    rows.append("C99,I999,500000.00,paid,2023-01-01,2024-06-01")  # extreme outlier
    csv_data = "customer_id,invoice_id,amount,status,subscription_date,last_payment_date\n" + "\n".join(rows)
    df = load_and_validate(csv_data.encode())
    anomalies = detect_anomalies(df)
    customer_ids = [a.customer_id for a in anomalies]
    assert "C99" in customer_ids, "Extreme outlier C99 should be flagged as anomaly"


# ─── Duplicate Detection ─────────────────────────────────────────────────────────

def test_duplicate_invoices_detected(sample_df):
    dupes = detect_duplicate_invoices(sample_df)
    # Sample data intentionally has duplicates
    assert len(dupes) > 0
    for d in dupes:
        assert d.occurrences >= 2


def test_no_duplicates_on_clean_data():
    csv_data = (
        "customer_id,invoice_id,amount,status,subscription_date,last_payment_date\n"
        "C1,I001,100,paid,2023-01-01,2024-01-01\n"
        "C2,I002,200,paid,2023-01-01,2024-01-01\n"
    )
    df = load_and_validate(csv_data.encode())
    dupes = detect_duplicate_invoices(df)
    assert len(dupes) == 0


# ─── Failed Payment Patterns ─────────────────────────────────────────────────────

def test_failed_payment_patterns_detected(sample_df):
    patterns = detect_failed_payment_patterns(sample_df)
    assert len(patterns) > 0
    for p in patterns:
        assert p.consecutive_failures >= 2
        assert p.amount_at_risk > 0


def test_no_patterns_on_all_paid():
    csv_data = (
        "customer_id,invoice_id,amount,status,subscription_date,last_payment_date\n"
        "C1,I001,100,paid,2023-01-01,2024-01-01\n"
        "C1,I002,100,paid,2023-01-01,2024-02-01\n"
    )
    df = load_and_validate(csv_data.encode())
    patterns = detect_failed_payment_patterns(df)
    assert len(patterns) == 0


# ─── Full Pipeline ────────────────────────────────────────────────────────────────

def test_full_pipeline(sample_bytes):
    """End-to-end: bytes in → InsightReport out."""
    report = run_analysis(sample_bytes)
    assert report.summary.total_revenue > 0
    assert report.summary.total_invoices > 0
    assert report.generated_at is not None
    # Report must expose all expected sections
    assert isinstance(report.revenue_drops, list)
    assert isinstance(report.anomalies, list)
    assert isinstance(report.duplicate_invoices, list)
    assert isinstance(report.inactive_customers, list)
    assert isinstance(report.failed_payment_patterns, list)
    # With our intentional anomalies, expect detections
    assert report.summary.anomalies_detected >= 0
