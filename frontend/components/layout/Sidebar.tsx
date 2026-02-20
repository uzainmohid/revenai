// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutGrid, Upload, FileBarChart2, Settings, LogOut, Zap } from "lucide-react";
// import { useLogout } from "@/lib/hooks/useApi";
// import { useAuthStore } from "@/store/auth";

// const NAV = [
//   { href: "/upload",   label: "Upload",   icon: Upload },
//   { href: "/analyses", label: "Analyses", icon: FileBarChart2 },
//   { href: "/settings", label: "Settings", icon: Settings },
// ];

// export function Sidebar() {
//   const path = usePathname();
//   const logout = useLogout();
//   const { email } = useAuthStore();

//   return (
//     <aside className="sidebar" style={{
//       width: "224px", flexShrink: 0, height: "100%",
//       background: "#0B0F1A",
//       borderRight: "1px solid #1E2D48",
//       display: "flex", flexDirection: "column",
//     }}>
//       {/* Brand */}
//       <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid #1E2D48" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px" }}>
//           <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#3B82F6,#6366F1)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 12px rgba(59,130,246,0.35)", flexShrink: 0 }}>
//             <Zap size={14} color="#fff" strokeWidth={2.5} />
//           </div>
//           <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "14px", fontWeight: 500, letterSpacing: "0.1em", color: "#E4EEFF" }}>REVENAI</span>
//         </div>
//         <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "8.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A2440", lineHeight: 1.7, margin: 0, paddingLeft: "38px" }}>
//           Stop Revenue Leakage<br />Before It Makes Loss.
//         </p>
//       </div>

//       {/* Nav */}
//       <nav style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
//         <p className="rv-label" style={{ padding: "4px 8px 10px", marginBottom: "2px" }}>Navigation</p>
//         {NAV.map(({ href, label, icon: Icon }) => {
//           const active = path === href || path.startsWith(href + "/");
//           return (
//             <Link key={href} href={href} style={{
//               display: "flex", alignItems: "center", gap: "10px",
//               padding: "9px 10px", borderRadius: "7px",
//               fontSize: "13px", fontWeight: active ? 600 : 500,
//               textDecoration: "none",
//               color: active ? "#3B82F6" : "#486080",
//               background: active ? "rgba(59,130,246,0.1)" : "transparent",
//               borderLeft: active ? "2px solid #3B82F6" : "2px solid transparent",
//               marginBottom: "2px",
//               transition: "all 0.15s",
//               fontFamily: "'DM Sans',sans-serif",
//             }}
//             onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#C2D4EE"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
//             onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "#486080"; e.currentTarget.style.background = "transparent"; } }}
//             >
//               <Icon size={15} color={active ? "#3B82F6" : "currentColor"} />
//               {label}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User */}
//       <div style={{ padding: "12px 10px 14px", borderTop: "1px solid #1E2D48" }}>
//         <div style={{ padding: "6px 10px 10px" }}>
//           <p className="rv-label" style={{ marginBottom: "2px" }}>Signed in as</p>
//           <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#2E4060", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{email}</p>
//         </div>
//         <button onClick={logout} style={{
//           display: "flex", alignItems: "center", gap: "10px",
//           width: "100%", padding: "9px 10px", borderRadius: "7px",
//           border: "none", background: "transparent",
//           color: "#486080", fontSize: "13px", fontWeight: 500,
//           cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
//           transition: "all 0.15s",
//         }}
//         onMouseEnter={e => { e.currentTarget.style.color = "#F87171"; e.currentTarget.style.background = "rgba(248,113,113,0.08)"; }}
//         onMouseLeave={e => { e.currentTarget.style.color = "#486080"; e.currentTarget.style.background = "transparent"; }}>
//           <LogOut size={14} />
//           Sign Out
//         </button>
//       </div>
//     </aside>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Upload,
//   FileBarChart2,
//   Settings,
//   LogOut,
//   Zap,
//   X,
// } from "lucide-react";
// import { useLogout } from "@/lib/hooks/useApi";
// import { useAuthStore } from "@/store/auth";

// const NAV = [
//   { href: "/upload", label: "Upload", icon: Upload },
//   { href: "/analyses", label: "Analyses", icon: FileBarChart2 },
//   { href: "/settings", label: "Settings", icon: Settings },
// ];

// export function Sidebar({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: (v: boolean) => void;
// }) {
//   const path = usePathname();
//   const logout = useLogout();
//   const { email } = useAuthStore();

//   return (
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed md:relative z-50
//           h-full w-72
//           bg-slate-900/80 backdrop-blur-2xl
//           border-r border-slate-800
//           flex flex-col
//           transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
//               <Zap size={18} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-sm font-semibold tracking-wide">
//                 REVENAI
//               </h1>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">
//                 Revenue Intelligence
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setOpen(false)}
//             className="md:hidden text-slate-400"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//           {NAV.map(({ href, label, icon: Icon }) => {
//             const active =
//               path === href || path.startsWith(href + "/");

//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 className={`
//                   group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
//                   ${
//                     active
//                       ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
//                       : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
//                   }
//                 `}
//               >
//                 <Icon size={16} />
//                 {label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="border-t border-slate-800 p-4 space-y-4">
//           <div>
//             <p className="text-xs text-slate-500 mb-1">Signed in as</p>
//             <p className="text-xs text-slate-300 truncate">{email}</p>
//           </div>

//           <button
//             onClick={logout}
//             className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition"
//           >
//             <LogOut size={15} />
//             Sign Out
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Upload,
  FileBarChart2,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { useLogout } from "@/lib/hooks/useApi";
import { useAuthStore } from "@/store/auth";

const NAV = [
  { href: "/upload", label: "Upload Intelligence", icon: Upload },
  { href: "/analyses", label: "Revenue Signals", icon: FileBarChart2 },
  { href: "/settings", label: "Workspace", icon: Settings },
];

export function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const path = usePathname();
  const logout = useLogout();
  const { email } = useAuthStore();

  return (
    <aside
      className={`
        fixed md:relative z-40
        w-72 h-full
        bg-[#0F1625]
        border-r border-[#1C263A]
        flex flex-col
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[#1C263A]">
        <div className="flex items-center gap-3">
          <Shield size={18} className="text-[#4C82F7]" />
          <div>
            <h1 className="text-sm font-semibold tracking-wide">
              REVENAI
            </h1>
            <p className="text-[10px] text-[#5C6C89] uppercase tracking-widest">
              Revenue Control Layer
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            path === href || path.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md text-sm
                transition-colors
                ${
                  active
                    ? "bg-[#162033] text-[#4C82F7]"
                    : "text-[#7E8CA6] hover:text-[#E6EDF7] hover:bg-[#141C2D]"
                }
              `}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#1C263A] p-5">
        <div className="text-xs text-[#5C6C89] mb-2">
          {email}
        </div>
        <button
          onClick={logout}
          className="text-sm text-[#7E8CA6] hover:text-red-400 transition"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
