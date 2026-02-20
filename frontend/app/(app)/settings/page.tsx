export default function SettingsPage() {
  return (
    <div style={{ padding: "32px 28px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 6px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.025em" }}>Settings</h2>
        <p style={{ fontSize: "13.5px", color: "#486080", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>Account and platform configuration.</p>
      </div>
      <div className="rv-card" style={{ padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "28px", marginBottom: "12px", opacity: 0.2 }}>⚙️</div>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "12px", color: "#2E4060", letterSpacing: "0.06em" }}>Settings panel coming in the next release</p>
      </div>
    </div>
  );
}
