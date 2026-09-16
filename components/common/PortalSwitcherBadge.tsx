"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ArrowLeftRight, ShieldCheck, GraduationCap } from "lucide-react";

export default function PortalSwitcherBadge() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside
      aria-label="Portal switcher"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-slate-900/90 text-white p-2 pl-3 rounded-2xl shadow-soft-xl border border-slate-700/80 backdrop-blur-md text-xs transition-all hover:scale-[1.02]"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Active Portal
          </span>
          <span className="font-bold flex items-center gap-1">
            {isAdmin ? (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>admin.gqtech.in</span>
              </>
            ) : (
              <>
                <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                <span>internships.gqtech.in</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="h-6 w-px bg-slate-700 mx-1" />

      <Link
        href={isAdmin ? "/" : "/admin"}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-medium transition-colors shadow-sm"
        title={isAdmin ? "Switch to Student / College Portal" : "Switch to GQT Admin Portal"}
      >
        <ArrowLeftRight className="h-3 w-3" />
        <span>Switch to {isAdmin ? "Student Portal" : "Admin Dashboard"}</span>
      </Link>
    </aside>
  );
}
