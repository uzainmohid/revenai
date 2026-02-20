"use client";
import Link from "next/link";
import { useReport } from "@/lib/hooks/useApi";
import { fmt$, fmtPct, fmtDateTime, downloadJson, totalIssues } from "@/lib/utils";
import { ArrowLeft, Download, AlertTriangle, TrendingDown, CreditCard, Copy, Users, BarChart3, AlertCircle } from "lucide-react";
import type { Report, Anomaly, Inactive } from "@/lib/schemas/api";

/* ── Skeleton ── */
function ReportSkeleton() {
  return (
    <div style={{ padding: "28px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      {[300, 60, 60, 60, 60, 60].map((w, i) => (
        <div key={i} className="skel" style={{ height: i === 0 ? "32px" : "20px", width: `${w}px`, marginBottom: "16px", maxWidth: "100%" }} />
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skel" style={{ height: "88px", borderRadius: "10px" }} />)}
      </div>
      {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skel" style={{ height: "60px", borderRadius: "8px", marginBottom: "8px" }} />)}
    </div>
  );
}

/* ── KPI card ── */
function Kpi({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rv-card" style={{ padding: "18px 16px", transition: "border-color 0.15s" }}>
      <p className="rv-label" style={{ marginBottom: "10px" }}>{label}</p>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "22px", fontWeight: 500, color: color ?? "#E4EEFF", lineHeight: 1, margin: "0 0 6px" }}>{value}</p>
      {sub && <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#1A2440", margin: 0 }}>{sub}</p>}
    </div>
  );
}

/* ── Section header ── */
function Section({ icon: Icon, label, count, color }: { icon: React.ElementType; label: string; count?: number; color?: string }) {
  return (
    <div className="rv-section">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Icon size={14} color={color ?? "#486080"} />
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#E4EEFF", fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
      </div>
      {count !== undefined && (
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#2E4060" }}>
          {count} {count === 1 ? "finding" : "findings"}
        </span>
      )}
    </div>
  );
}

/* ── Empty ── */
function Empty({ text }: { text: string }) {
  return (
    <div className="rv-empty">
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11.5px", color: "#1A2440", letterSpacing: "0.06em", margin: 0 }}>{text}</p>
    </div>
  );
}

/* ── Insight row ── */
function Insight({ label, msg, color }: { label: string; msg: string; color: string }) {
  return (
    <div className="rv-insight">
      <div className="rv-stripe" style={{ background: color }} />
      <div className="rv-insight-body">
        <p className="rv-insight-tag" style={{ color }}>{label}</p>
        <p className="rv-insight-msg">{msg}</p>
      </div>
    </div>
  );
}

/* ── Severity badge ── */
function SevBadge({ s }: { s: string }) {
  const cfg: Record<string, [string, string, string]> = {
    high:   ["rgba(248,113,113,0.08)", "rgba(248,113,113,0.22)", "#F87171"],
    medium: ["rgba(251,191,36,0.08)",  "rgba(251,191,36,0.22)",  "#FBBF24"],
    low:    ["rgba(52,211,153,0.08)",  "rgba(52,211,153,0.22)",  "#34D399"],
  };
  const [bg, border, color] = cfg[s] ?? ["rgba(255,255,255,0.04)", "#1E2D48", "#486080"];
  return (
    <span className="rv-badge" style={{ background: bg, borderColor: border, color }}>{s}</span>
  );
}

/* ── Anomaly table ── */
function AnomalyTable({ rows }: { rows: Anomaly[] }) {
  if (!rows.length) return <Empty text="No anomalies detected" />;
  return (
    <div className="rv-card" style={{ overflow: "hidden" }}>
      <table className="rv-table">
        <thead>
          <tr>
            {["Customer", "Invoice", "Amount", "Severity", "Reason"].map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((a, i) => (
            <tr key={i}>
              <td style={{ fontFamily: "'DM Mono',monospace" }}>{a.customer_id}</td>
              <td style={{ fontFamily: "'DM Mono',monospace", color: "#486080" }}>{a.invoice_id}</td>
              <td style={{ fontFamily: "'DM Mono',monospace" }}>{fmt$(a.amount)}</td>
              <td><SevBadge s={a.severity} /></td>
              <td style={{ color: "#486080", fontSize: "12px" }}>{a.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Inactive table ── */
function InactiveTable({ rows }: { rows: Inactive[] }) {
  if (!rows.length) return <Empty text="All high-value customers are active" />;
  return (
    <div className="rv-card" style={{ overflow: "hidden" }}>
      <table className="rv-table">
        <thead>
          <tr>
            {["Customer", "Last Payment", "Days Inactive", "Lifetime Value", "Risk"].map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((c, i) => (
            <tr key={i}>
              <td style={{ fontFamily: "'DM Mono',monospace" }}>{c.customer_id}</td>
              <td style={{ fontFamily: "'DM Mono',monospace", color: "#486080" }}>{c.last_payment_date}</td>
              <td style={{ fontFamily: "'DM Mono',monospace", color: "#FBBF24" }}>{c.days_inactive}d</td>
              <td style={{ fontFamily: "'DM Mono',monospace" }}>{fmt$(c.lifetime_value)}</td>
              <td>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: c.risk_level === "critical" ? "#F87171" : "#FBBF24" }}>
                  {c.risk_level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Alert banner ── */
function Banner({ report }: { report: Report }) {
  const n = totalIssues(report);
  const cfg = n >= 3
    ? { bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.2)", dot: "🔴", title: "High Risk Detected", desc: `${n} revenue issues found — immediate review recommended` }
    : n >= 1
    ? { bg: "rgba(251,191,36,0.06)",  border: "rgba(251,191,36,0.18)",  dot: "🟡", title: "Attention Required",  desc: `${n} issue${n > 1 ? "s" : ""} flagged across your revenue data` }
    : { bg: "rgba(52,211,153,0.06)",  border: "rgba(52,211,153,0.18)",  dot: "🟢", title: "Revenue Healthy",      desc: "No issues detected — all signals clear" };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "16px 18px", background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: "10px", marginBottom: "28px" }}>
      <span style={{ fontSize: "18px", lineHeight: 1, marginTop: "1px" }}>{cfg.dot}</span>
      <div>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#E4EEFF", margin: "0 0 3px", fontFamily: "'DM Sans',sans-serif" }}>{cfg.title}</p>
        <p style={{ fontSize: "12px", color: "#486080", fontFamily: "'DM Mono',monospace", margin: 0 }}>{cfg.desc}</p>
      </div>
    </div>
  );
}

/* ── Main report ── */
function FullReport({ report, id }: { report: Report; id: number }) {
  const s = report.summary;
  const rateColor = s.payment_success_rate >= 90 ? "#34D399" : s.payment_success_rate >= 70 ? "#FBBF24" : "#F87171";

  return (
    <div style={{ padding: "28px 24px 56px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div className="a-fade-up" style={{ marginBottom: "22px" }}>
        <Link href="/analyses" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "'DM Mono',monospace", fontSize: "11.5px", color: "#2E4060", textDecoration: "none", marginBottom: "12px", transition: "color 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#3B82F6")}
          onMouseLeave={e => (e.currentTarget.style.color = "#2E4060")}>
          <ArrowLeft size={12} /> All Analyses
        </Link>
        <div className="rv-report-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 5px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.025em" }}>
              Intelligence Report <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "14px", color: "#2E4060", fontWeight: 400 }}>#{id}</span>
            </h2>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#2E4060", margin: 0 }}>
              Generated {fmtDateTime(report.generated_at)}
            </p>
          </div>
          <button onClick={() => downloadJson(report, `revenai-report-${id}-${Date.now()}.json`)} className="rv-ghost">
            <Download size={13} /> Export JSON
          </button>
        </div>
      </div>

      {/* Alert banner */}
      <div className="a-fade-up d1"><Banner report={report} /></div>

      {/* KPI strip */}
      <Section icon={BarChart3} label="Executive Summary" />
      <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "8px" }}>
        {[
          { label: "Total Revenue",    value: fmt$(s.total_revenue, true),       sub: "from paid invoices",      color: undefined },
          { label: "Success Rate",     value: fmtPct(s.payment_success_rate),    sub: `${s.paid_invoices}/${s.total_invoices} paid`, color: rateColor },
          { label: "Failed Payments",  value: String(s.failed_invoices),         sub: "invoices unpaid",         color: s.failed_invoices > 0 ? "#F87171" : undefined },
          { label: "Anomalies",        value: String(s.anomalies_detected),      sub: "isolation forest",        color: s.anomalies_detected > 0 ? "#FBBF24" : undefined },
          { label: "Customers",        value: String(s.unique_customers),        sub: "unique accounts",         color: undefined },
          { label: "Avg Invoice",      value: fmt$(s.avg_invoice_value, true),   sub: "per paid invoice",        color: undefined },
        ].map(kpi => (
          <div key={kpi.label} className="a-fade-up d1">
            <Kpi {...kpi} />
          </div>
        ))}
      </div>

      {/* Revenue Drops */}
      <Section icon={TrendingDown} label="Revenue Drop Detection" count={report.revenue_drops.length} color="#F87171" />
      {report.revenue_drops.length
        ? report.revenue_drops.map((d, i) => <Insight key={i} label={`Revenue Drop · ${d.period}`} msg={d.message} color="#F87171" />)
        : <Empty text="No significant revenue drops detected" />}

      {/* Anomalies */}
      <Section icon={AlertTriangle} label="Anomaly Detection — Isolation Forest" count={report.anomalies.length} color="#FBBF24" />
      <AnomalyTable rows={report.anomalies} />

      {/* Failed Payments */}
      <Section icon={CreditCard} label="Failed Payment Patterns" count={report.failed_payment_patterns.length} color="#F87171" />
      {report.failed_payment_patterns.length
        ? report.failed_payment_patterns.map((p, i) => <Insight key={i} label={`${p.consecutive_failures}× Consecutive Failures · ${p.customer_id}`} msg={p.message} color="#F87171" />)
        : <Empty text="No consecutive payment failure patterns found" />}

      {/* Duplicate Invoices */}
      <Section icon={Copy} label="Duplicate Invoice Detection" count={report.duplicate_invoices.length} color="#FBBF24" />
      {report.duplicate_invoices.length
        ? report.duplicate_invoices.map((d, i) => <Insight key={i} label={`Duplicate Billing · ${d.invoice_id}`} msg={d.message} color="#FBBF24" />)
        : <Empty text="No duplicate invoices detected" />}

      {/* Inactive Customers */}
      <Section icon={Users} label="Churn Risk — Inactive High-Value Customers" count={report.inactive_customers.length} color="#FBBF24" />
      <InactiveTable rows={report.inactive_customers} />
    </div>
  );
}

/* ── Public export ── */
export function ReportView({ analysisId }: { analysisId: number }) {
  const { data, isLoading, error } = useReport(analysisId);

  if (isLoading) return <ReportSkeleton />;

  if (error) return (
    <div style={{ padding: "28px 24px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "12px", padding: "16px 18px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: "10px" }}>
        <AlertCircle size={15} color="#F87171" style={{ flexShrink: 0, marginTop: "1px" }} />
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#E4EEFF", margin: "0 0 4px", fontFamily: "'DM Sans',sans-serif" }}>Failed to load report</p>
          <p style={{ fontSize: "12px", color: "#F87171", fontFamily: "'DM Mono',monospace", margin: 0 }}>{error.message}</p>
        </div>
      </div>
      <Link href="/analyses" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "16px", fontFamily: "'DM Mono',monospace", fontSize: "12px", color: "#3B82F6", textDecoration: "none" }}>
        <ArrowLeft size={12} /> Back to analyses
      </Link>
    </div>
  );

  if (!data) return null;
  return <FullReport report={data} id={analysisId} />;
}
