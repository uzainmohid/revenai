// "use client";
// import { usePathname } from "next/navigation";
// import { useAuthStore } from "@/store/auth";
// import { useLogout } from "@/lib/hooks/useApi";
// import { Menu, LogOut } from "lucide-react";

// const TITLES: Record<string, string> = {
//   "/upload":   "Upload Intelligence",
//   "/analyses": "Analyses",
//   "/settings": "Settings",
// };

// export function TopBar() {
//   const path = usePathname();
//   const { email } = useAuthStore();
//   const logout = useLogout();
//   const title = Object.entries(TITLES).find(([k]) => path === k || path.startsWith(k + "/"))?.[1] ?? "REVENAI";

//   return (
//     <header style={{
//       height: "52px", flexShrink: 0,
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       padding: "0 22px",
//       background: "rgba(11,15,26,0.85)",
//       borderBottom: "1px solid #1E2D48",
//       backdropFilter: "blur(12px)",
//       WebkitBackdropFilter: "blur(12px)",
//     }}>
//       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//         <h1 style={{ fontSize: "13.5px", fontWeight: 600, color: "#E4EEFF", margin: 0, fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.01em" }}>
//           {title}
//         </h1>
//       </div>

//       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//         {/* Live indicator */}
//         <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//           <div style={{ position: "relative", width: "8px", height: "8px" }}>
//             <div className="a-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#34D399", opacity: 0.4 }} />
//             <div style={{ position: "absolute", inset: "1px", borderRadius: "50%", background: "#34D399" }} />
//           </div>
//           <span className="hide-mobile" style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#2E4060" }}>Live</span>
//         </div>

//         <div style={{ width: "1px", height: "16px", background: "#1E2D48" }} />

//         <span className="hide-mobile" style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#2E4060", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//           {email}
//         </span>

//         {/* Mobile logout */}
//         <button onClick={logout} className="hide-mobile" style={{ display: "none" }}><LogOut size={15} /></button>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { usePathname } from "next/navigation";
// import { useAuthStore } from "@/store/auth";
// import { Menu, Activity } from "lucide-react";

// const TITLES: Record<string, string> = {
//   "/upload": "Upload Intelligence",
//   "/analyses": "Revenue Analyses",
//   "/settings": "Workspace Settings",
// };

// export function TopBar({
//   toggleSidebar,
// }: {
//   toggleSidebar: () => void;
// }) {
//   const path = usePathname();
//   const { email } = useAuthStore();

//   const title =
//     Object.entries(TITLES).find(
//       ([k]) => path === k || path.startsWith(k + "/")
//     )?.[1] ?? "Dashboard";

//   return (
//     <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 md:px-10 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800">

//       <div className="flex items-center gap-4">
//         <button
//           onClick={toggleSidebar}
//           className="md:hidden text-slate-400"
//         >
//           <Menu size={20} />
//         </button>

//         <h1 className="text-lg font-semibold tracking-tight text-slate-100">
//           {title}
//         </h1>
//       </div>

//       <div className="flex items-center gap-6">

//         {/* Live system status */}
//         <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
//           <Activity size={14} className="text-emerald-400" />
//           AI Engine Active
//         </div>

//         <div className="hidden md:block h-5 w-px bg-slate-800" />

//         <div className="hidden md:block text-sm text-slate-400 truncate max-w-[200px]">
//           {email}
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Menu, Activity } from "lucide-react";

const TITLES: Record<string, string> = {
  "/upload": "Upload Intelligence",
  "/analyses": "Revenue Signals",
  "/settings": "Workspace Settings",
};

export function TopBar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const path = usePathname();
  const { email } = useAuthStore();

  const title =
    Object.entries(TITLES).find(
      ([k]) => path === k || path.startsWith(k + "/")
    )?.[1] ?? "Dashboard";

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-[#1C263A] bg-[#0F1625]">

      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-[#7E8CA6]"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold tracking-tight">
          {title}
        </h1>

        {/* ENV BADGE */}
        <span className="hidden md:inline-flex items-center px-2 py-1 text-[10px] font-medium rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          LIVE
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm text-[#7E8CA6]">

        <div className="hidden md:flex items-center gap-2">
          <Activity size={14} className="text-emerald-400" />
          AI Engine Healthy
        </div>

        <div className="hidden md:block w-px h-5 bg-[#1C263A]" />

        <div className="hidden md:block truncate max-w-[220px]">
          {email}
        </div>
      </div>
    </header>
  );
}
