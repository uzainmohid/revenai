"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle2, AlertCircle, Zap, X, Shield, Brain, TrendingDown } from "lucide-react";
import { useUploadFile } from "@/lib/hooks/useApi";
import { apiReport } from "@/lib/api/endpoints";

type Stage = "idle" | "ready" | "processing" | "done" | "error";

const AI_STEPS = [
  "Parsing revenue records and validating schema…",
  "Running Isolation Forest anomaly detection…",
  "Detecting month-over-month revenue drop patterns…",
  "Scanning for duplicate invoice occurrences…",
  "Identifying consecutive payment failure sequences…",
  "Computing churn risk across high-value accounts…",
  "Generating executive intelligence brief…",
];

const FEATURES = [
  { icon: Brain,      title: "Isolation Forest AI",    desc: "ML-powered statistical anomaly detection on every invoice" },
  { icon: TrendingDown, title: "Revenue Drop Analysis", desc: "Flags month-over-month drops exceeding 30% with dollar impact" },
  { icon: Shield,     title: "Duplicate Detection",     desc: "Catches double-billed invoices that cause compliance risk" },
];

export function UploadView() {
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const [step, setStep] = useState(0);
  const upload = useUploadFile();
  const router = useRouter();

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) { setFile(accepted[0]); setStage("ready"); setErrMsg(""); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1, maxSize: 10 * 1024 * 1024,
    onDropRejected: (r) => { setErrMsg(r[0]?.errors[0]?.message ?? "Invalid file"); setStage("error"); },
  });

  const run = async () => {
    if (!file) return;
    setStage("processing"); setStep(0);
    const iv = setInterval(() => setStep(i => i < AI_STEPS.length - 1 ? i + 1 : i), 900);
    try {
      const analysis = await upload.mutateAsync(file);
      await apiReport(analysis.id);
      clearInterval(iv); setStage("done");
      setTimeout(() => router.push(`/analyses/${analysis.id}`), 900);
    } catch (e: unknown) {
      clearInterval(iv);
      setErrMsg(e instanceof Error ? e.message : "Analysis failed"); setStage("error");
    }
  };

  return (
    <div style={{ padding: "28px 24px 48px", maxWidth: "880px", margin: "0 auto" }}>
      {/* Header */}
      <div className="a-fade-up" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 8px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.025em" }}>
          Upload Intelligence
        </h2>
        <p style={{ fontSize: "14px", color: "#486080", margin: 0, lineHeight: 1.6 }}>
          Drop your revenue CSV. The AI engine surfaces financial leakage in seconds.
        </p>
      </div>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }} className="rv-upload-cols">
        {/* Left: upload zone */}
        <div style={{ flex: "1 1 420px", minWidth: "320px" }}>
          {/* Schema */}
          <div className="rv-card a-fade-up d1" style={{ padding: "16px 18px", marginBottom: "16px" }}>
            <p className="rv-label" style={{ marginBottom: "12px" }}>Required CSV Columns</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {["customer_id", "invoice_id", "amount", "status", "subscription_date", "last_payment_date"].map(c => (
                <span key={c} style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", padding: "4px 10px", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: "5px", color: "#3B82F6" }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Drop zone - idle/error */}
          {(stage === "idle" || stage === "error") && (
            <div>
              <div {...getRootProps()} className="a-fade-up d2" style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: "14px", padding: "48px 20px",
                background: isDragActive ? "rgba(59,130,246,0.06)" : "#0B0F1A",
                border: `2px dashed ${isDragActive ? "#3B82F6" : "#1E2D48"}`,
                borderRadius: "12px", cursor: "pointer",
                transition: "all 0.2s",
              }}>
                <input {...getInputProps()} />
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: isDragActive ? "rgba(59,130,246,0.12)" : "#0F1526", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", border: `1px solid ${isDragActive ? "rgba(59,130,246,0.3)" : "#1E2D48"}` }}>
                  <Upload size={22} color={isDragActive ? "#3B82F6" : "#486080"} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14.5px", fontWeight: 600, color: isDragActive ? "#E4EEFF" : "#C2D4EE", margin: "0 0 5px", fontFamily: "'DM Sans',sans-serif" }}>
                    {isDragActive ? "Release to upload" : "Drop CSV here, or click to browse"}
                  </p>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#2E4060", margin: 0 }}>CSV files only · Max 10 MB</p>
                </div>
              </div>
              {stage === "error" && errMsg && (
                <div style={{ display: "flex", gap: "10px", padding: "12px 14px", marginTop: "12px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: "8px" }}>
                  <AlertCircle size={14} color="#F87171" style={{ flexShrink: 0, marginTop: "1px" }} />
                  <span style={{ fontSize: "12px", color: "#F87171", fontFamily: "'DM Mono',monospace", lineHeight: 1.5 }}>{errMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* File ready */}
          {stage === "ready" && file && (
            <div className="a-fade-up">
              <div className="rv-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", marginBottom: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={18} color="#3B82F6" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "#E4EEFF", margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#2E4060", margin: 0 }}>{(file.size / 1024).toFixed(1)} KB · CSV</p>
                </div>
                <button onClick={() => { setFile(null); setStage("idle"); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#2E4060", display: "flex", padding: "4px", borderRadius: "5px" }}><X size={15} /></button>
              </div>
              <button onClick={run} className="rv-btn" style={{ width: "100%", padding: "13px 20px", fontSize: "14px" }}>
                <Zap size={16} /> Run Intelligence Analysis
              </button>
            </div>
          )}

          {/* Processing */}
          {stage === "processing" && (
            <div className="a-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "52px 20px", textAlign: "center", gap: "22px" }}>
              <div style={{ position: "relative", width: "60px", height: "60px" }}>
                <div className="a-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(59,130,246,0.2)" }} />
                <div className="a-pulse" style={{ position: "absolute", inset: "6px", borderRadius: "50%", background: "rgba(59,130,246,0.15)" }} />
                <div style={{ position: "absolute", inset: "13px", borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#6366F1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(59,130,246,0.5)" }}>
                  <Zap size={16} color="#fff" />
                </div>
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 8px", fontFamily: "'DM Sans',sans-serif" }}>AI Engine Running</p>
                <p key={step} className="a-fade-in" style={{ fontSize: "12.5px", color: "#486080", fontFamily: "'DM Mono',monospace", margin: 0, minHeight: "20px" }}>
                  {AI_STEPS[step]}
                </p>
              </div>
              {/* Progress dots */}
              <div style={{ display: "flex", gap: "6px" }}>
                {AI_STEPS.map((_, i) => (
                  <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: i <= step ? "#3B82F6" : "#1E2D48", transition: "background 0.3s" }} />
                ))}
              </div>
            </div>
          )}

          {/* Done */}
          {stage === "done" && (
            <div className="a-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "52px 20px", gap: "14px", textAlign: "center" }}>
              <div style={{ width: "52px", height: "52px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={24} color="#34D399" />
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 5px", fontFamily: "'DM Sans',sans-serif" }}>Analysis Complete</p>
                <p style={{ fontSize: "12px", color: "#486080", fontFamily: "'DM Mono',monospace", margin: 0 }}>Redirecting to intelligence report…</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: feature list */}
        <div style={{ flex: "0 1 280px", minWidth: "240px" }}>
          <p className="rv-label a-fade-up d2" style={{ marginBottom: "14px" }}>What gets detected</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`rv-card a-fade-up d${i + 3}`} style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <Icon size={14} color="#3B82F6" />
                  </div>
                  <div>
                    <p style={{ fontSize: "12.5px", fontWeight: 600, color: "#E4EEFF", margin: "0 0 4px", fontFamily: "'DM Sans',sans-serif" }}>{title}</p>
                    <p style={{ fontSize: "11.5px", color: "#486080", margin: 0, lineHeight: 1.55 }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Sample data tip */}
            <div className="a-fade-up d6" style={{ marginTop: "6px", padding: "14px", background: "rgba(251,191,36,0.04)", border: "1px solid rgba(251,191,36,0.12)", borderRadius: "10px" }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FBBF24", margin: "0 0 6px" }}>💡 Sample Data</p>
              <p style={{ fontSize: "11.5px", color: "#486080", margin: 0, lineHeight: 1.55 }}>
                Find <code style={{ fontFamily: "'DM Mono',monospace", color: "#3B82F6", fontSize: "10.5px" }}>sample_data/revenue_sample.csv</code> in the project root to test every detector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
