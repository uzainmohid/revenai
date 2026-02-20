export function fmt$(v: number, compact = false): string {
  if (compact && Math.abs(v) >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (compact && Math.abs(v) >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(v);
}

export function fmtPct(v: number): string { return `${v.toFixed(1)}%`; }

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function downloadJson(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: filename });
  a.click(); URL.revokeObjectURL(a.href);
}

export function totalIssues(r: { revenue_drops: unknown[]; duplicate_invoices: unknown[]; failed_payment_patterns: unknown[]; inactive_customers: unknown[] }): number {
  return r.revenue_drops.length + r.duplicate_invoices.length + r.failed_payment_patterns.length + r.inactive_customers.length;
}
