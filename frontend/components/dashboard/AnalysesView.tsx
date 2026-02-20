"use client";
import Link from "next/link";
import { useAnalyses } from "@/lib/hooks/useApi";
import { fmt$, fmtDateTime } from "@/lib/utils";
import { Upload, FileBarChart2, AlertCircle, ArrowRight, Clock } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; border: string; color: string; dot: string }> = {
    complete: { bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.22)",  color: "#34D399", dot: "#34D399" },
    failed:   { bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.22)", color: "#F87171", dot: "#F87171" },
    pending:  { bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.22)",  color: "#FBBF24", dot: "#FBBF24" },
  };
  const c = cfg[status] ?? cfg.pending;
  return (
    <span className="rv-badge" style={{ background: c.bg, borderColor: c.border, color: c.color }}>
      <span className="rv-badge-dot" style={{ background: c.dot, animation: status === "pending" ? "pulse 2.5s ease infinite" : "none" }} />
      {status}
    </span>
  );
}

function SkRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderBottom: "1px solid #1E2D48" }}>
      {[200, 140, 90, 80, 24].map((w, i) => (
        <div key={i} className="skel" style={{ height: "13px", width: `${w}px`, flexShrink: i === 4 ? 0 : undefined }} />
      ))}
    </div>
  );
}

export function AnalysesView() {
  const { data, isLoading, error } = useAnalyses();

  return (
    <div style={{ padding: "28px 24px 48px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div className="a-fade-up" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "14px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 6px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.025em" }}>
            Revenue Analyses
          </h2>
          <p style={{ fontSize: "14px", color: "#486080", margin: 0 }}>All AI intelligence reports generated from your data.</p>
        </div>
        <Link href="/upload" className="rv-btn" style={{ textDecoration: "none" }}>
          <Upload size={14} /> New Analysis
        </Link>
      </div>

      {/* Stats row */}
      {!isLoading && data && data.length > 0 && (
        <div className="a-fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
          {[
            { label: "Total Analyses", value: data.length },
            { label: "Completed",      value: data.filter(a => a.status === "complete").length },
            { label: "Total Revenue Analysed", value: fmt$(data.reduce((s, a) => s + (a.total_revenue ?? 0), 0), true) },
          ].map(({ label, value }) => (
            <div key={label} className="rv-card" style={{ padding: "16px 18px" }}>
              <p className="rv-label" style={{ marginBottom: "8px" }}>{label}</p>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "20px", fontWeight: 500, color: "#E4EEFF", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="rv-card a-fade-up d2" style={{ overflow: "hidden" }}>
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1fr 110px 28px", gap: "12px", padding: "11px 20px", background: "#07090F", borderBottom: "1px solid #1E2D48" }}>
          {["File", "Date", "Revenue", "Status", ""].map(h => (
            <span key={h} className="rv-label" style={{ margin: 0 }}>{h}</span>
          ))}
        </div>

        {/* Loading */}
        {isLoading && Array.from({ length: 5 }).map((_, i) => <SkRow key={i} />)}

        {/* Error */}
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "24px 20px" }}>
            <AlertCircle size={15} color="#F87171" />
            <span style={{ fontSize: "13px", color: "#F87171", fontFamily: "'DM Mono',monospace" }}>{error.message}</span>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && data?.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 20px", textAlign: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", background: "#0F1526", border: "1px solid #1E2D48", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileBarChart2 size={24} color="#1E2D48" />
            </div>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#C2D4EE", margin: "0 0 5px", fontFamily: "'DM Sans',sans-serif" }}>No analyses yet</p>
              <p style={{ fontSize: "12.5px", color: "#2E4060", fontFamily: "'DM Mono',monospace", margin: "0 0 18px" }}>Upload a revenue CSV to generate your first intelligence report.</p>
            </div>
            <Link href="/upload" className="rv-btn" style={{ textDecoration: "none" }}>
              <Upload size={14} /> Upload CSV
            </Link>
          </div>
        )}

        {/* Rows */}
        {data?.map((a, idx) => (
          <Link key={a.id} href={`/analyses/${a.id}`} style={{
            display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1fr 110px 28px",
            gap: "12px", alignItems: "center",
            padding: "15px 20px",
            borderBottom: idx < data.length - 1 ? "1px solid #1E2D48" : "none",
            textDecoration: "none",
            transition: "background 0.15s",
            background: "transparent",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#0F1526")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
              <div style={{ width: "32px", height: "32px", background: "#0F1526", border: "1px solid #1E2D48", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileBarChart2 size={14} color="#486080" />
              </div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "12.5px", color: "#C2D4EE", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.filename}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={11} color="#2E4060" />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11.5px", color: "#486080" }}>{fmtDateTime(a.created_at)}</span>
            </div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "12.5px", color: a.total_revenue ? "#C2D4EE" : "#2E4060" }}>
              {a.total_revenue != null ? fmt$(a.total_revenue, true) : "—"}
            </span>
            <StatusBadge status={a.status} />
            <ArrowRight size={14} color="#2E4060" />
          </Link>
        ))}
      </div>
    </div>
  );
}
