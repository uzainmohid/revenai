// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useState } from "react";
// import { Eye, EyeOff, ArrowRight, AlertCircle, Zap } from "lucide-react";
// import { LoginReqSchema, type LoginReq } from "@/lib/schemas/api";
// import { useLogin } from "@/lib/hooks/useApi";

// export function LoginForm() {
//   const [show, setShow] = useState(false);
//   const login = useLogin();
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginReq>({
//     resolver: zodResolver(LoginReqSchema),
//   });

//   return (
//     <div style={{ width: "100%", maxWidth: "420px" }} className="a-fade-up">
//       {/* Brand */}
//       <div style={{ marginBottom: "40px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
//           <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg,#3B82F6,#6366F1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(59,130,246,0.4)" }}>
//             <Zap size={16} color="#fff" strokeWidth={2.5} />
//           </div>
//           <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "17px", fontWeight: 500, letterSpacing: "0.12em", color: "#E4EEFF" }}>REVENAI</span>
//         </div>
//         <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A2440", lineHeight: 1.6, margin: 0, paddingLeft: "42px" }}>
//           Stop Revenue Leakage<br />Before It Makes Loss.
//         </p>
//       </div>

//       {/* Card */}
//       <div className="rv-card" style={{ padding: "32px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset" }}>
//         <h1 style={{ fontSize: "17px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 4px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.02em" }}>
//           Sign in to your account
//         </h1>
//         <p style={{ fontSize: "12.5px", color: "#486080", fontFamily: "'DM Mono',monospace", margin: "0 0 24px" }}>
//           Access your revenue intelligence dashboard
//         </p>

//         {login.error && (
//           <div style={{ display: "flex", gap: "10px", padding: "12px 14px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: "8px", marginBottom: "20px" }}>
//             <AlertCircle size={14} color="#F87171" style={{ flexShrink: 0, marginTop: "1px" }} />
//             <span style={{ fontSize: "12px", color: "#F87171", fontFamily: "'DM Mono',monospace", lineHeight: 1.5 }}>{login.error.message}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit((d) => login.mutate(d))} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <div>
//             <label className="rv-label" style={{ marginBottom: "8px" }}>Email address</label>
//             <input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com"
//               className={`rv-input${errors.email ? " err" : ""}`} />
//             {errors.email && <p style={{ margin: "5px 0 0", fontSize: "11px", color: "#F87171", fontFamily: "'DM Mono',monospace" }}>{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="rv-label" style={{ marginBottom: "8px" }}>Password</label>
//             <div style={{ position: "relative" }}>
//               <input {...register("password")} type={show ? "text" : "password"} autoComplete="current-password"
//                 placeholder="••••••••" className={`rv-input${errors.password ? " err" : ""}`} style={{ paddingRight: "44px" }} />
//               <button type="button" onClick={() => setShow(s => !s)}
//                 style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#2E4060", display: "flex", padding: "2px" }}>
//                 {show ? <EyeOff size={15} /> : <Eye size={15} />}
//               </button>
//             </div>
//             {errors.password && <p style={{ margin: "5px 0 0", fontSize: "11px", color: "#F87171", fontFamily: "'DM Mono',monospace" }}>{errors.password.message}</p>}
//           </div>

//           <div style={{ height: "4px" }} />

//           <button type="submit" className="rv-btn full" disabled={login.isPending}>
//             {login.isPending
//               ? <><span className="a-spin" style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} />Authenticating…</>
//               : <>Sign In <ArrowRight size={14} /></>}
//           </button>
//         </form>

//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//           <span style={{ fontSize: "12.5px", color: "#486080", fontFamily: "'DM Mono',monospace" }}>
//             No account?{" "}
//             <Link href="/register" style={{ color: "#3B82F6", textDecoration: "none" }}>Create one →</Link>
//           </span>
//         </div>
//       </div>

//       {/* Trust signals */}
//       <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "20px" }}>
//         {["256-bit encrypted", "SOC 2 ready", "Zero data retention"].map(t => (
//           <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#1A2440", letterSpacing: "0.1em", textTransform: "uppercase" }}>✓ {t}</span>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useState } from "react";
// import { Eye, EyeOff, ArrowRight, AlertCircle, Zap } from "lucide-react";
// import { LoginReqSchema, type LoginReq } from "@/lib/schemas/api";
// import { useLogin } from "@/lib/hooks/useApi";

// export function LoginForm() {
//   const [show, setShow] = useState(false);
//   const login = useLogin();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginReq>({
//     resolver: zodResolver(LoginReqSchema),
//   });

//   return (
//     <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">

//       {/* Ambient background light */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/20 blur-[160px] rounded-full animate-pulse" />
//         <div className="absolute bottom-[-300px] right-[-200px] w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full" />
//       </div>

//       <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-20 px-6">

//         {/* Left Premium Branding Panel */}
//         <div className="hidden md:flex flex-col justify-center">

//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
//               <Zap size={20} className="text-white" strokeWidth={2.2} />
//             </div>

//             <div>
//               <h1 className="text-2xl font-semibold text-slate-100 tracking-wide">
//                 REVENAI
//               </h1>

//               <p className="text-sm text-slate-400 overflow-hidden">
//                 <span className="block animate-fadeUp">
//                   Stop Revenue Leakage
//                 </span>
//                 <span className="block animate-fadeUp delay-200">
//                   Before It Makes Loss.
//                 </span>
//               </p>
//             </div>
//           </div>

//           <p className="text-slate-400 text-lg max-w-md leading-relaxed">
//             AI-powered anomaly detection and revenue intelligence built
//             for modern SaaS finance teams.
//           </p>

//           <div className="mt-10 flex gap-10 text-sm text-slate-500">
//             <span>Real-time anomaly detection</span>
//             <span>Enterprise-grade security</span>
//           </div>
//         </div>

//         {/* Right Auth Card */}
//         <div className="flex items-center justify-center">
//           <div className="group w-full max-w-md relative">

//             {/* Card glow */}
//             <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />

//             <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/50 transition duration-500 group-hover:border-slate-700">

//               <h2 className="text-xl font-semibold text-slate-100 mb-1 tracking-tight">
//                 Sign in
//               </h2>

//               <p className="text-sm text-slate-400 mb-6">
//                 Access your revenue intelligence dashboard
//               </p>

//               {login.error && (
//                 <div className="flex gap-3 p-3 mb-6 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
//                   <AlertCircle size={16} className="mt-0.5 shrink-0" />
//                   {login.error.message}
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSubmit((d) => login.mutate(d))}
//                 className="flex flex-col gap-6"
//                 noValidate
//               >
//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm text-slate-400 mb-2">
//                     Email address
//                   </label>

//                   <input
//                     {...register("email")}
//                     type="email"
//                     placeholder="you@company.com"
//                     className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
//                   />

//                   {errors.email && (
//                     <p className="text-xs text-red-400 mt-2">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label className="block text-sm text-slate-400 mb-2">
//                     Password
//                   </label>

//                   <div className="relative">
//                     <input
//                       {...register("password")}
//                       type={show ? "text" : "password"}
//                       placeholder="••••••••"
//                       className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 pr-12 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
//                     />

//                     <button
//                       type="button"
//                       onClick={() => setShow((s) => !s)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
//                     >
//                       {show ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>

//                   {errors.password && (
//                     <p className="text-xs text-red-400 mt-2">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Stripe-level Button */}
//                 <button
//                   type="submit"
//                   disabled={login.isPending}
//                   className="relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-50"
//                 >
//                   {login.isPending ? "Authenticating…" : "Sign In"}
//                   {!login.isPending && <ArrowRight size={16} />}
//                 </button>
//               </form>

//               <div className="mt-6 text-center text-sm text-slate-500">
//                 No account?{" "}
//                 <Link
//                   href="/register"
//                   className="text-blue-500 hover:text-blue-400 transition"
//                 >
//                   Create one →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   Eye,
//   EyeOff,
//   ArrowRight,
//   AlertCircle,
//   Zap,
//   ShieldCheck,
//   Activity,
// } from "lucide-react";
// import { LoginReqSchema, type LoginReq } from "@/lib/schemas/api";
// import { useLogin } from "@/lib/hooks/useApi";

// export function LoginForm() {
//   const [show, setShow] = useState(false);
//   const login = useLogin();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginReq>({
//     resolver: zodResolver(LoginReqSchema),
//   });

//   return (
//     <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

//       {/* ===== CINEMATIC BACKGROUND ===== */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-[400px] left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] bg-blue-600/20 blur-[200px] rounded-full animate-pulse" />
//         <div className="absolute bottom-[-300px] right-[-200px] w-[900px] h-[900px] bg-indigo-600/20 blur-[200px] rounded-full" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_40%)]" />
//       </div>

//       <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

//         {/* ===== LEFT BRAND PANEL ===== */}
//         <div className="hidden lg:flex flex-col justify-center px-20">

//           {/* Logo + Slogan */}
//           <div className="flex items-center gap-4 mb-10">
//             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
//               <Zap size={24} className="text-white" strokeWidth={2.5} />
//             </div>

//             <div>
//               <h1 className="text-3xl font-semibold tracking-tight">
//                 REVENAI
//               </h1>

//               <div className="overflow-hidden h-6 mt-1">
//                 <p className="text-sm text-slate-400 animate-[slideUp_6s_infinite]">
//                   Stop Revenue Leakage Before It Makes Loss.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
//             AI-powered revenue anomaly detection and financial intelligence
//             infrastructure built for modern SaaS operators.
//           </p>

//           {/* Trust Signals */}
//           <div className="mt-12 space-y-4 text-sm text-slate-500">
//             <div className="flex items-center gap-3">
//               <ShieldCheck size={16} className="text-emerald-400" />
//               Enterprise-grade encryption
//             </div>
//             <div className="flex items-center gap-3">
//               <Activity size={16} className="text-blue-400" />
//               Real-time AI anomaly detection
//             </div>
//           </div>
//         </div>

//         {/* ===== RIGHT AUTH PANEL ===== */}
//         <div className="flex items-center justify-center px-6 py-16">

//           <div className="group relative w-full max-w-md">

//             {/* Glow border */}
//             <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500/40 to-indigo-500/40 opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />

//             <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-10 shadow-2xl shadow-black/60 transition duration-500 group-hover:border-slate-700">

//               <h2 className="text-2xl font-semibold tracking-tight mb-2">
//                 Welcome back
//               </h2>

//               <p className="text-sm text-slate-400 mb-8">
//                 Access your revenue intelligence workspace
//               </p>

//               {login.error && (
//                 <div className="flex gap-3 p-4 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
//                   <AlertCircle size={16} className="mt-0.5 shrink-0" />
//                   {login.error.message}
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSubmit((d) => login.mutate(d))}
//                 className="space-y-6"
//                 noValidate
//               >
//                 {/* Email */}
//                 <div className="relative">
//                   <input
//                     {...register("email")}
//                     type="email"
//                     placeholder="Email address"
//                     className="peer w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
//                   />
//                   {errors.email && (
//                     <p className="text-xs text-red-400 mt-2">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="relative">
//                   <input
//                     {...register("password")}
//                     type={show ? "text" : "password"}
//                     placeholder="Password"
//                     className="peer w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 pr-12 text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShow((s) => !s)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
//                   >
//                     {show ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>

//                   {errors.password && (
//                     <p className="text-xs text-red-400 mt-2">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Stripe-Level Button */}
//                 <button
//                   type="submit"
//                   disabled={login.isPending}
//                   className="relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40 active:scale-[0.97] disabled:opacity-50"
//                 >
//                   {login.isPending ? "Authenticating…" : "Sign In"}
//                   {!login.isPending && <ArrowRight size={16} />}
//                 </button>
//               </form>

//               <div className="mt-8 text-center text-sm text-slate-500">
//                 Don’t have an account?{" "}
//                 <Link
//                   href="/register"
//                   className="text-blue-400 hover:text-blue-300 transition"
//                 >
//                   Create one →
//                 </Link>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Activity,
  BrainCircuit,
} from "lucide-react";
import { LoginReqSchema, type LoginReq } from "@/lib/schemas/api";
import { useLogin } from "@/lib/hooks/useApi";

export function LoginForm() {
  const [show, setShow] = useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReq>({
    resolver: zodResolver(LoginReqSchema),
  });

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[450px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-blue-600/15 blur-[220px] rounded-full" />
        <div className="absolute bottom-[-350px] right-[-250px] w-[1000px] h-[1000px] bg-indigo-600/15 blur-[220px] rounded-full" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center px-20 py-20">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <BrainCircuit size={26} className="text-white" strokeWidth={2} />
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                REVENAI
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                AI-Native Revenue Risk Infrastructure
              </p>
            </div>
          </div>

          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Built for CFOs, revenue leaders, and SaaS operators who
            cannot afford silent ARR leakage.
          </p>

          <div className="mt-12 space-y-4 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-emerald-400" />
              Enterprise-grade security & compliance
            </div>
            <div className="flex items-center gap-3">
              <Activity size={16} className="text-blue-400" />
              Real-time AI revenue monitoring
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-6">

          <div className="w-full max-w-md">

            <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-10 shadow-2xl shadow-black/60">

              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                Sign in to your workspace
              </h2>

              <p className="text-sm text-slate-400 mb-8">
                Access your revenue control layer
              </p>

              {login.error && (
                <div className="flex gap-3 p-4 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {login.error.message}
                </div>
              )}

              <form
                onSubmit={handleSubmit((d) => login.mutate(d))}
                className="space-y-6"
                noValidate
              >
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Work email"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                />

                <div className="relative">
                  <input
                    {...register("password")}
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 pr-12 text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={login.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.98] transition disabled:opacity-50"
                >
                  {login.isPending ? "Authenticating…" : "Sign In"}
                  {!login.isPending && <ArrowRight size={16} />}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Create workspace →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
