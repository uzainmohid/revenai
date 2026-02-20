import { z } from "zod";

export const LoginReqSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export const RegisterReqSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
  full_name: z.string().optional(),
});
export const TokenResSchema = z.object({
  access_token: z.string(),
  token_type: z.string().default("bearer"),
});
export const UserOutSchema = z.object({
  id: z.number(),
  email: z.string(),
  full_name: z.string().nullable().optional(),
  created_at: z.string(),
});
export const AnalysisOutSchema = z.object({
  id: z.number(),
  filename: z.string(),
  row_count: z.number().nullable().optional(),
  total_revenue: z.number().nullable().optional(),
  status: z.enum(["pending", "complete", "failed"]),
  created_at: z.string(),
});
export const SummarySchema = z.object({
  total_revenue: z.number(),
  total_invoices: z.number(),
  unique_customers: z.number(),
  paid_invoices: z.number(),
  failed_invoices: z.number(),
  payment_success_rate: z.number(),
  avg_invoice_value: z.number(),
  anomalies_detected: z.number(),
});
export const AnomalySchema = z.object({
  customer_id: z.string(),
  invoice_id: z.string(),
  amount: z.number(),
  reason: z.string(),
  severity: z.enum(["high", "medium", "low"]),
});
export const RevenueDropSchema = z.object({
  period: z.string(),
  previous_revenue: z.number(),
  current_revenue: z.number(),
  drop_pct: z.number(),
  estimated_loss: z.number(),
  message: z.string(),
});
export const DuplicateSchema = z.object({
  invoice_id: z.string(),
  customer_id: z.string(),
  amount: z.number(),
  occurrences: z.number(),
  message: z.string(),
});
export const InactiveSchema = z.object({
  customer_id: z.string(),
  last_payment_date: z.string(),
  days_inactive: z.number(),
  lifetime_value: z.number(),
  risk_level: z.enum(["critical", "high"]),
  message: z.string(),
});
export const FailedPatternSchema = z.object({
  customer_id: z.string(),
  consecutive_failures: z.number(),
  amount_at_risk: z.number(),
  message: z.string(),
});
export const ReportSchema = z.object({
  summary: SummarySchema,
  revenue_drops: z.array(RevenueDropSchema),
  anomalies: z.array(AnomalySchema),
  duplicate_invoices: z.array(DuplicateSchema),
  inactive_customers: z.array(InactiveSchema),
  failed_payment_patterns: z.array(FailedPatternSchema),
  generated_at: z.string(),
});

export type LoginReq      = z.infer<typeof LoginReqSchema>;
export type RegisterReq   = z.infer<typeof RegisterReqSchema>;
export type TokenRes      = z.infer<typeof TokenResSchema>;
export type AnalysisOut   = z.infer<typeof AnalysisOutSchema>;
export type Summary       = z.infer<typeof SummarySchema>;
export type Anomaly       = z.infer<typeof AnomalySchema>;
export type RevenueDrop   = z.infer<typeof RevenueDropSchema>;
export type Duplicate     = z.infer<typeof DuplicateSchema>;
export type Inactive      = z.infer<typeof InactiveSchema>;
export type FailedPattern = z.infer<typeof FailedPatternSchema>;
export type Report        = z.infer<typeof ReportSchema>;
