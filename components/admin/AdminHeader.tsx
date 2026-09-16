"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Plus,
  ShieldCheck,
  ChevronDown,
  Briefcase,
  Megaphone,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import notificationsData from "@/data/notifications.json";

export default function AdminHeader() {
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search internships, candidate USN, colleges, circulars..."
            className="w-full h-10 pl-10 pr-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Quick Create Dropdown */}
          <div className="relative">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setQuickActionOpen(!quickActionOpen)}
              className="rounded-xl font-bold text-xs h-9"
            >
              <Plus className="h-4 w-4" />
              <span>Quick Create</span>
              <ChevronDown className="h-3 w-3 ml-0.5" />
            </Button>

            {quickActionOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-soft-xl border border-slate-200 p-2 z-30 space-y-1 animate-fade-up text-xs">
                <Link
                  href="/admin/internships/new"
                  onClick={() => setQuickActionOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  <Briefcase className="h-4 w-4 text-brand-blue" />
                  <span>Post New Internship</span>
                </Link>
                <Link
                  href="/admin/circulars"
                  onClick={() => setQuickActionOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  <Megaphone className="h-4 w-4 text-amber-500" />
                  <span>Publish Circular Notice</span>
                </Link>
                <Link
                  href="/admin/colleges"
                  onClick={() => setQuickActionOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  <GraduationCap className="h-4 w-4 text-emerald-600" />
                  <span>Onboard Partner College</span>
                </Link>
              </div>
            )}
          </div>

          {/* Admin Notifications Bell */}
          <button
            onClick={() => setNotifDrawerOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-brand-blue hover:bg-slate-100 transition-colors relative"
            aria-label="Open Admin Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {/* Admin Status Tag */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-700">VTU Server Sync Active</span>
          </div>
        </div>
      </div>

      {/* Notifications Drawer */}
      <Drawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
        title="Admin Notifications Feed"
        description="System activity, student applications, and college inquiries."
      >
        <div className="space-y-3 text-xs">
          {notificationsData.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {n.timestamp}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  );
}
