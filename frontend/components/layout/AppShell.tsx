// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/auth";
// import { Sidebar } from "./Sidebar";
// import { TopBar } from "./TopBar";

// export function AppShell({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated()) router.replace("/login");
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated()) return null;

//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#07090F" }}>
//       <Sidebar />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
//         <TopBar />
//         <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/auth";
// import { Sidebar } from "./Sidebar";
// import { TopBar } from "./TopBar";

// export function AppShell({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuthStore();
//   const router = useRouter();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     if (!isAuthenticated()) router.replace("/login");
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated()) return null;

//   return (
//     <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

//       {/* Ambient Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/10 blur-[160px] rounded-full" />
//         <div className="absolute bottom-[-300px] right-[-200px] w-[700px] h-[700px] bg-indigo-600/10 blur-[160px] rounded-full" />
//       </div>

//       <div className="relative z-10 flex h-screen">

//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         <div className="flex flex-col flex-1 min-w-0">

//           <TopBar toggleSidebar={() => setSidebarOpen((s) => !s)} />

//           <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
//             <div className="max-w-[1400px] mx-auto">
//               {children}
//             </div>
//           </main>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated()) return null;

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-[#E6EDF7]">

      {/* GRID LIGHTING SYSTEM */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>

      <div className="relative flex h-screen">

        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex flex-col flex-1 min-w-0">

          <TopBar toggleSidebar={() => setSidebarOpen((s) => !s)} />

          {/* ELEVATION LAYER E1 */}
          <main className="flex-1 overflow-y-auto px-8 md:px-12 py-10">
            <div className="max-w-[1500px] mx-auto">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
