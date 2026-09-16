"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  Award,
  User,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  GraduationCap,
  Menu,
  X,
  ShieldCheck,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      name: "My Applications",
      href: "/dashboard/applications",
      icon: Briefcase,
      badge: "6 Active",
    },
    {
      name: "Saved Internships",
      href: "/dashboard/saved",
      icon: Bookmark,
      badge: "2",
    },
    {
      name: "Certificates",
      href: "/dashboard/certificates",
      icon: Award,
      badge: "1 Ready",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
      badge: "85%",
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      badge: "3 New",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      badge: undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Student Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Dashboard Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 hidden sm:inline-block">
                STUDENT DASHBOARD
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">|</span>
              <span className="text-xs text-slate-600 font-medium">
                RV College of Engineering (USN: 1RV22CS089)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/notifications"
              className="relative p-2 rounded-xl text-slate-500 hover:text-brand-blue hover:bg-slate-100 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </Link>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center text-xs">
                RP
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-slate-800 leading-tight">Rohan Patil</p>
                <p className="text-[10px] text-slate-400">8th Sem • CSE</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Area: Sidebar + Subpage Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft sticky top-20">
            {/* Student Profile Card preview */}
            <div className="p-3 bg-slate-50 rounded-xl mb-4 text-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy text-white font-bold flex items-center justify-center mx-auto mb-2 text-base shadow-sm">
                RP
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Rohan M. Patil</h4>
              <p className="text-[11px] text-slate-500">RV College of Engineering</p>
              <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                <span>Profile Strength</span>
                <span className="font-bold text-emerald-700">85%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[85%]" />
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1 text-xs" aria-label="Dashboard Navigation">
              {sidebarLinks.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all duration-150",
                      isActive
                        ? "bg-brand-blue text-white font-bold shadow-soft"
                        : "text-slate-600 hover:text-brand-blue hover:bg-blue-50/50"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full font-bold",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                href="/login"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-full bg-white p-5 flex flex-col justify-between shadow-2xl z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-sm text-slate-900">
                    Student Menu
                  </span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 text-slate-400 rounded-lg hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-1 text-xs">
                  {sidebarLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-100"
                    >
                      <span className="flex items-center gap-2.5">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-xs font-semibold text-rose-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out of Student Session</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
