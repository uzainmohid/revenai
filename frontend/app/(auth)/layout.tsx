export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#07090F",
      backgroundImage: `
        radial-gradient(ellipse 1000px 600px at 50% -100px, rgba(59,130,246,0.08) 0%, transparent 65%),
        radial-gradient(ellipse 500px 400px at 85% 60%, rgba(99,102,241,0.05) 0%, transparent 55%)
      `,
      display: "flex",
      flexDirection: "column" as const,
    }}>
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" }}>
        {children}
      </main>
      <footer style={{ padding: "20px", textAlign: "center" as const }}>
        <span className="rv-label" style={{ display: "inline", fontSize: "9px", letterSpacing: "0.2em" }}>
          REVENAI · EXECUTIVE INTELLIGENCE PLATFORM · v2.0
        </span>
      </footer>
    </div>
  );
}
