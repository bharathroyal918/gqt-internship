"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Users,
  GraduationCap,
  BellRing,
  Megaphone,
  Handshake,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function AdminSidebar({
  collapsed,
  setCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      name: "Internships",
      href: "/admin/internships",
      icon: Briefcase,
      badge: "100",
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: Building2,
      badge: "50",
    },
    {
      name: "Applicants",
      href: "/admin/applications",
      icon: Users,
      badge: "40 New",
    },
    {
      name: "Colleges",
      href: "/admin/colleges",
      icon: GraduationCap,
      badge: "30",
    },
    {
      name: "Circulars",
      href: "/admin/circulars",
      icon: BellRing,
      badge: "20",
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: Megaphone,
      badge: undefined,
    },
    {
      name: "Industry Partners",
      href: "/admin/partners",
      icon: Handshake,
      badge: undefined,
    },
    {
      name: "Reports & Analytics",
      href: "/admin/reports",
      icon: BarChart3,
      badge: undefined,
    },
    {
      name: "System Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: undefined,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-[#021B49] text-white flex flex-col justify-between transition-all duration-300 z-30 flex-shrink-0 border-r border-slate-800 relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold shadow-soft flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-amber-400" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm text-white tracking-tight">
                  GQT ADMIN
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Executive Suite
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle admin sidebar"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 text-xs" aria-label="Admin Navigation">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-brand-blue text-white font-bold shadow-soft"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
                title={collapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-3 truncate">
                  <item.icon
                    className={cn(
                      "h-4 w-4 flex-shrink-0 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-amber-400"
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-slate-300"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Session */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {!collapsed && (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
            <div className="h-9 w-9 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs flex-shrink-0">
              AD
            </div>
            <div className="truncate text-xs">
              <p className="font-bold text-white truncate">Dr. Arvind Swamy</p>
              <p className="text-[10px] text-slate-400">Super Administrator</p>
            </div>
          </div>
        )}

        <Link
          href="/login"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors",
            collapsed && "justify-center px-0"
          )}
          title="Sign out of Admin Session"
        >
          <LogOut className="h-4 w-4 text-rose-400 flex-shrink-0" />
          {!collapsed && <span>Admin Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
