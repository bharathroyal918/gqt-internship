"use client";

import React, { useState } from "react";
import Link from "next/link";
import notificationsData from "@/data/notifications.json";
import { NotificationItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Bell,
  CheckCircle2,
  Calendar,
  Briefcase,
  Award,
  Megaphone,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>(
    notificationsData as NotificationItem[]
  );
  const [filter, setFilter] = useState("all");

  const unreadCount = items.filter((i) => !i.read).length;

  const markAllRead = () => {
    setItems(items.map((i) => ({ ...i, read: true })));
    toast.success("All notifications marked as read!");
  };

  const toggleRead = (id: string) => {
    setItems(
      items.map((i) => (i.id === id ? { ...i, read: !i.read } : i))
    );
  };

  const filtered = items.filter((i) => {
    if (filter === "unread") return !i.read;
    if (filter === "application") return i.type === "application";
    if (filter === "circular") return i.type === "circular";
    if (filter === "interview") return i.type === "interview";
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-4 w-4 text-brand-blue" />;
      case "interview":
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case "circular":
        return <Megaphone className="h-4 w-4 text-amber-600" />;
      default:
        return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Notifications & Broadcasts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time alerts regarding interviews, offer releases, and VTU circulars.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            className="rounded-xl text-xs"
          >
            <CheckCheck className="h-3.5 w-3.5 mr-1" />
            <span>Mark All as Read ({unreadCount})</span>
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        {[
          { id: "all", label: "All Alerts" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "application", label: "Applications" },
          { id: "interview", label: "Interviews" },
          { id: "circular", label: "Circulars" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
              filter === tab.id
                ? "bg-brand-blue text-white shadow-soft"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No notifications found in this category.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => toggleRead(n.id)}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-slate-50 ${
                !n.read ? "bg-blue-50/40" : ""
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {n.message}
                </p>
                {n.link && (
                  <Link
                    href={n.link}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 text-[11px] font-semibold text-brand-blue hover:underline"
                  >
                    View Details →
                  </Link>
                )}
              </div>

              {!n.read && (
                <span className="h-2 w-2 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
