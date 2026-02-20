// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useState } from "react";
// import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Zap } from "lucide-react";
// import { RegisterReqSchema, type RegisterReq } from "@/lib/schemas/api";
// import { useRegister } from "@/lib/hooks/useApi";

// export function RegisterForm() {
//   const [show, setShow] = useState(false);
//   const [done, setDone] = useState(false);
//   const reg = useRegister();
//   const { register, handleSubmit, formState: { errors } } = useForm<RegisterReq>({
//     resolver: zodResolver(RegisterReqSchema),
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

//       <div className="rv-card" style={{ padding: "32px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset" }}>
//         {done ? (
//           <div style={{ textAlign: "center", padding: "16px 0" }} className="a-fade-in">
//             <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
//               <div style={{ width: "52px", height: "52px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <CheckCircle2 size={24} color="#34D399" />
//               </div>
//             </div>
//             <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 6px", fontFamily: "'DM Sans',sans-serif" }}>Account created</h2>
//             <p style={{ fontSize: "12.5px", color: "#486080", fontFamily: "'DM Mono',monospace", margin: "0 0 20px" }}>Sign in to access your dashboard.</p>
//             <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "#3B82F6", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>
//               Sign in now <ArrowRight size={13} />
//             </Link>
//           </div>
//         ) : (
//           <>
//             <h1 style={{ fontSize: "17px", fontWeight: 700, color: "#E4EEFF", margin: "0 0 4px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.02em" }}>Create your account</h1>
//             <p style={{ fontSize: "12.5px", color: "#486080", fontFamily: "'DM Mono',monospace", margin: "0 0 24px" }}>Start detecting revenue leakage today</p>

//             {reg.error && (
//               <div style={{ display: "flex", gap: "10px", padding: "12px 14px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: "8px", marginBottom: "20px" }}>
//                 <AlertCircle size={14} color="#F87171" style={{ flexShrink: 0, marginTop: "1px" }} />
//                 <span style={{ fontSize: "12px", color: "#F87171", fontFamily: "'DM Mono',monospace" }}>{reg.error.message}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit((d) => reg.mutate(d, { onSuccess: () => setDone(true) }))} noValidate style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//               <div>
//                 <label className="rv-label" style={{ marginBottom: "8px" }}>Full name</label>
//                 <input {...register("full_name")} type="text" autoComplete="name" placeholder="Jane Smith" className="rv-input" />
//               </div>
//               <div>
//                 <label className="rv-label" style={{ marginBottom: "8px" }}>Email address</label>
//                 <input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com"
//                   className={`rv-input${errors.email ? " err" : ""}`} />
//                 {errors.email && <p style={{ margin: "5px 0 0", fontSize: "11px", color: "#F87171", fontFamily: "'DM Mono',monospace" }}>{errors.email.message}</p>}
//               </div>
//               <div>
//                 <label className="rv-label" style={{ marginBottom: "8px" }}>Password (min 8 characters)</label>
//                 <div style={{ position: "relative" }}>
//                   <input {...register("password")} type={show ? "text" : "password"} autoComplete="new-password"
//                     placeholder="Min. 8 characters" className={`rv-input${errors.password ? " err" : ""}`} style={{ paddingRight: "44px" }} />
//                   <button type="button" onClick={() => setShow(s => !s)}
//                     style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#2E4060", display: "flex", padding: "2px" }}>
//                     {show ? <EyeOff size={15} /> : <Eye size={15} />}
//                   </button>
//                 </div>
//                 {errors.password && <p style={{ margin: "5px 0 0", fontSize: "11px", color: "#F87171", fontFamily: "'DM Mono',monospace" }}>{errors.password.message}</p>}
//               </div>
//               <div style={{ height: "4px" }} />
//               <button type="submit" className="rv-btn full" disabled={reg.isPending}>
//                 {reg.isPending
//                   ? <><span className="a-spin" style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} />Creating account…</>
//                   : <>Create Account <ArrowRight size={14} /></>}
//               </button>
//             </form>

//             <div style={{ marginTop: "20px", textAlign: "center" }}>
//               <span style={{ fontSize: "12.5px", color: "#486080", fontFamily: "'DM Mono',monospace" }}>
//                 Already have an account?{" "}
//                 <Link href="/login" style={{ color: "#3B82F6", textDecoration: "none" }}>Sign in →</Link>
//               </span>
//             </div>
//           </>
//         )}
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
//   CheckCircle2,
//   AlertCircle,
//   Zap,
// } from "lucide-react";
// import { RegisterReqSchema, type RegisterReq } from "@/lib/schemas/api";
// import { useRegister } from "@/lib/hooks/useApi";

// export function RegisterForm() {
//   const [show, setShow] = useState(false);
//   const [done, setDone] = useState(false);
//   const reg = useRegister();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterReq>({
//     resolver: zodResolver(RegisterReqSchema),
//   });

//   return (
//     <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">

//       {/* Ambient background light */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/20 blur-[160px] rounded-full" />
//         <div className="absolute bottom-[-300px] right-[-200px] w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full" />
//       </div>

//       <div className="relative z-10 w-full max-w-md px-6">

//         {/* Brand */}
//         <div className="flex items-center gap-3 mb-10">
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
//             <Zap size={18} className="text-white" />
//           </div>

//           <div>
//             <h1 className="text-xl font-semibold text-slate-100">
//               REVENAI
//             </h1>
//             <p className="text-xs text-slate-500">
//               Stop Revenue Leakage Before It Makes Loss.
//             </p>
//           </div>
//         </div>

//         <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/50">

//           {done ? (
//             <div className="text-center py-6">
//               <div className="flex justify-center mb-4">
//                 <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
//                   <CheckCircle2 size={26} className="text-emerald-400" />
//                 </div>
//               </div>

//               <h2 className="text-lg font-semibold text-slate-100 mb-2">
//                 Account created
//               </h2>

//               <p className="text-sm text-slate-400 mb-6">
//                 Your workspace is ready. Sign in to continue.
//               </p>

//               <Link
//                 href="/login"
//                 className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white hover:scale-[1.02] active:scale-[0.98] transition"
//               >
//                 Sign in now <ArrowRight size={16} />
//               </Link>
//             </div>
//           ) : (
//             <>
//               <h2 className="text-xl font-semibold text-slate-100 mb-1">
//                 Create your account
//               </h2>

//               <p className="text-sm text-slate-400 mb-6">
//                 Start detecting revenue leakage today
//               </p>

//               {reg.error && (
//                 <div className="flex gap-3 p-3 mb-6 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
//                   <AlertCircle size={16} className="mt-0.5 shrink-0" />
//                   {reg.error.message}
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSubmit((d) =>
//                   reg.mutate(d, { onSuccess: () => setDone(true) })
//                 )}
//                 className="flex flex-col gap-6"
//                 noValidate
//               >
//                 <input
//                   {...register("full_name")}
//                   placeholder="Full name"
//                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
//                 />

//                 <input
//                   {...register("email")}
//                   placeholder="you@company.com"
//                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
//                 />

//                 <div className="relative">
//                   <input
//                     {...register("password")}
//                     type={show ? "text" : "password"}
//                     placeholder="Min. 8 characters"
//                     className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 pr-12 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShow((s) => !s)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
//                   >
//                     {show ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={reg.isPending}
//                   className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
//                 >
//                   {reg.isPending ? "Creating account…" : "Create Account"}
//                   {!reg.isPending && <ArrowRight size={16} />}
//                 </button>
//               </form>

//               <div className="mt-6 text-center text-sm text-slate-500">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="text-blue-500 hover:text-blue-400 transition"
//                 >
//                   Sign in →
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useState, useMemo } from "react";
// import {
//   Eye,
//   EyeOff,
//   ArrowRight,
//   CheckCircle2,
//   AlertCircle,
//   Zap,
//   Activity,
// } from "lucide-react";
// import { RegisterReqSchema, type RegisterReq } from "@/lib/schemas/api";
// import { useRegister } from "@/lib/hooks/useApi";

// export function RegisterForm() {
//   const [show, setShow] = useState(false);
//   const [done, setDone] = useState(false);
//   const reg = useRegister();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<RegisterReq>({
//     resolver: zodResolver(RegisterReqSchema),
//   });

//   const password = watch("password") || "";

//   /* ===== PASSWORD STRENGTH ===== */
//   const strength = useMemo(() => {
//     let score = 0;
//     if (password.length > 7) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[^A-Za-z0-9]/.test(password)) score++;
//     return score;
//   }, [password]);

//   const strengthColor =
//     strength <= 1
//       ? "bg-red-500"
//       : strength === 2
//       ? "bg-yellow-500"
//       : strength === 3
//       ? "bg-blue-500"
//       : "bg-emerald-500";

//   return (
//     <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

//       {/* Cinematic background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-[400px] left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] bg-blue-600/20 blur-[200px] rounded-full animate-pulse" />
//         <div className="absolute bottom-[-300px] right-[-200px] w-[900px] h-[900px] bg-indigo-600/20 blur-[200px] rounded-full" />
//       </div>

//       <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

//         {/* ===== LEFT BRAND PANEL ===== */}
//         <div className="hidden lg:flex flex-col justify-center px-20">

//           <div className="flex items-center gap-4 mb-10">
//             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
//               <Zap size={24} className="text-white" />
//             </div>

//             <div>
//               <h1 className="text-3xl font-semibold tracking-tight">
//                 REVENAI
//               </h1>

//               <p className="text-sm text-slate-400 mt-1">
//                 Stop Revenue Leakage Before It Makes Loss.
//               </p>
//             </div>
//           </div>

//           <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
//             Deploy AI-powered anomaly detection across your revenue
//             infrastructure in minutes.
//           </p>

//           <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
//             <Activity
//               size={14}
//               className="text-emerald-400 animate-pulse"
//             />
//             AI Engine Ready
//           </div>
//         </div>

//         {/* ===== RIGHT PANEL ===== */}
//         <div className="flex items-center justify-center px-6 py-16">

//           <div className="group relative w-full max-w-md">

//             <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500/40 to-indigo-500/40 opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />

//             <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-10 shadow-2xl shadow-black/60 transition">

//               {done ? (
//                 <div className="text-center py-6">
//                   <div className="flex justify-center mb-6">
//                     <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
//                       <CheckCircle2 size={30} className="text-emerald-400" />
//                     </div>
//                   </div>

//                   <h2 className="text-2xl font-semibold mb-2">
//                     Workspace created
//                   </h2>

//                   <p className="text-sm text-slate-400 mb-8">
//                     Your AI revenue engine is ready.
//                   </p>

//                   <Link
//                     href="/login"
//                     className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.97] transition"
//                   >
//                     Continue to sign in <ArrowRight size={16} />
//                   </Link>
//                 </div>
//               ) : (
//                 <>
//                   <h2 className="text-2xl font-semibold mb-2">
//                     Create your workspace
//                   </h2>

//                   <p className="text-sm text-slate-400 mb-8">
//                     Start preventing revenue leakage today
//                   </p>

//                   {reg.error && (
//                     <div className="flex gap-3 p-4 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
//                       <AlertCircle size={16} />
//                       {reg.error.message}
//                     </div>
//                   )}

//                   <form
//                     onSubmit={handleSubmit((d) =>
//                       reg.mutate(d, {
//                         onSuccess: () => setDone(true),
//                       })
//                     )}
//                     className="space-y-6"
//                     noValidate
//                   >
//                     <input
//                       {...register("full_name")}
//                       placeholder="Full name"
//                       className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
//                     />

//                     <input
//                       {...register("email")}
//                       placeholder="Work email"
//                       className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
//                     />

//                     <div>
//                       <div className="relative">
//                         <input
//                           {...register("password")}
//                           type={show ? "text" : "password"}
//                           placeholder="Password"
//                           className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 pr-12 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShow((s) => !s)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
//                         >
//                           {show ? <EyeOff size={16} /> : <Eye size={16} />}
//                         </button>
//                       </div>

//                       {/* Strength meter */}
//                       {password && (
//                         <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
//                           <div
//                             className={`h-full ${strengthColor} transition-all duration-500`}
//                             style={{ width: `${strength * 25}%` }}
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={reg.isPending}
//                       className="relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40 active:scale-[0.97] disabled:opacity-50"
//                     >
//                       {reg.isPending ? (
//                         <span className="flex items-center gap-2">
//                           <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                           Creating workspace…
//                         </span>
//                       ) : (
//                         <>
//                           Create Account
//                           <ArrowRight size={16} />
//                         </>
//                       )}
//                     </button>
//                   </form>

//                   <div className="mt-8 text-center text-sm text-slate-500">
//                     Already have an account?{" "}
//                     <Link
//                       href="/login"
//                       className="text-blue-400 hover:text-blue-300 transition"
//                     >
//                       Sign in →
//                     </Link>
//                   </div>
//                 </>
//               )}
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
import { useState, useMemo } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
} from "lucide-react";
import { RegisterReqSchema, type RegisterReq } from "@/lib/schemas/api";
import { useRegister } from "@/lib/hooks/useApi";

export function RegisterForm() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const reg = useRegister();

  const {
    register,
    handleSubmit,
    watch,
  } = useForm<RegisterReq>({
    resolver: zodResolver(RegisterReqSchema),
  });

  const password = watch("password") || "";

  const strength = useMemo(() => {
    let score = 0;
    if (password.length > 7) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[450px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-blue-600/15 blur-[220px] rounded-full" />
        <div className="absolute bottom-[-350px] right-[-250px] w-[1000px] h-[1000px] bg-indigo-600/15 blur-[220px] rounded-full" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center px-20 py-20">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <BrainCircuit size={26} className="text-white" />
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
            Deploy AI revenue monitoring across your billing,
            subscription, and payment systems in minutes.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-6">

          <div className="w-full max-w-md">
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-10 shadow-2xl shadow-black/60">

              {done ? (
                <div className="text-center py-6">
                  <div className="flex justify-center mb-6">
                    <CheckCircle2 size={36} className="text-emerald-400" />
                  </div>

                  <h2 className="text-2xl font-semibold mb-2">
                    Workspace created
                  </h2>

                  <p className="text-sm text-slate-400 mb-8">
                    Your revenue control layer is now active.
                  </p>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.98] transition"
                  >
                    Continue to sign in <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-2">
                    Create your workspace
                  </h2>

                  <p className="text-sm text-slate-400 mb-8">
                    Built for SaaS finance & revenue teams
                  </p>

                  {reg.error && (
                    <div className="flex gap-3 p-4 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      {reg.error.message}
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit((d) =>
                      reg.mutate(d, {
                        onSuccess: () => setDone(true),
                      })
                    )}
                    className="space-y-6"
                    noValidate
                  >
                    <input
                      {...register("full_name")}
                      placeholder="Full name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                    />

                    <input
                      {...register("email")}
                      placeholder="Work email"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                    />

                    <div className="relative">
                      <input
                        {...register("password")}
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 pr-12 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
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
                      disabled={reg.isPending}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.98] transition disabled:opacity-50"
                    >
                      {reg.isPending ? "Creating workspace…" : "Create Workspace"}
                      {!reg.isPending && <ArrowRight size={16} />}
                    </button>
                  </form>

                  <div className="mt-8 text-center text-sm text-slate-500">
                    Already have access?{" "}
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Sign in →
                    </Link>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
