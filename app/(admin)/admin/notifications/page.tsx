"use client";

import React, { useState } from "react";
import notificationsData from "@/data/notifications.json";
import { NotificationItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Megaphone,
  Mail,
  Smartphone,
  Bell,
  Send,
  Users,
  CheckCircle2,
  Clock,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminNotificationsPage() {
  const [history, setHistory] = useState<NotificationItem[]>(
    notificationsData as NotificationItem[]
  );

  const [title, setTitle] = useState("Bengaluru Tech Summit Placement Fair");
  const [message, setMessage] = useState(
    "Registrations are now live for VTU 2026 passing out students. 80+ tier-1 companies hiring with stipends up to ₹35,000/month."
  );
  const [audience, setAudience] = useState("students");
  const [activeChannelTab, setActiveChannelTab] = useState("inapp");
  const [isSending, setIsSending] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: title,
        message: message,
        timestamp: "Just now",
        type: "system",
        read: false,
        audience: audience as any,
      };

      setHistory([newNotif, ...history]);
      toast.success("Broadcast Dispatched!", {
        description: `Alert delivered across active ${audience.toUpperCase()} devices and email gateways.`,
      });
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Notification & Broadcast Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Compose multi-channel notifications across in-app timeline, institutional email, and SMS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Compose Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-brand-blue" />
            <span>Compose Broadcast</span>
          </h2>

          <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target Audience *
              </label>
              <Select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                <option value="students">All Enrolled VTU Students (10,000+)</option>
                <option value="final_year">Final Year 8th Semester Students Only</option>
                <option value="colleges">Partner College Placement Officers (30)</option>
                <option value="companies">Corporate Recruiters & HR Heads (50)</option>
              </Select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Broadcast Headline *
              </label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief headline (under 60 chars)"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Notification Body Text *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Full announcement details..."
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSending}
              className="w-full rounded-xl font-bold shadow-soft"
            >
              <Send className="h-4 w-4 mr-1" />
              <span>Broadcast to {audience.toUpperCase()}</span>
            </Button>
          </form>
        </div>

        {/* Right: Live Multi-Channel Previews */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Live Channel Previews
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">
              Auto-syncs as you type
            </span>
          </div>

          <Tabs defaultValue="inapp">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="inapp">In-App Alert</TabsTrigger>
              <TabsTrigger value="email">Email Template</TabsTrigger>
              <TabsTrigger value="sms">SMS / Push</TabsTrigger>
            </TabsList>

            {/* In-App Preview */}
            <TabsContent value="inapp" className="space-y-3 pt-3">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">
                      {title || "Headline preview"}
                    </span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    {message || "Message content preview..."}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Email Preview */}
            <TabsContent value="email" className="space-y-3 pt-3">
              <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs bg-slate-50">
                <div className="bg-brand-navy p-3 text-white flex items-center justify-between">
                  <span className="font-bold text-xs">Global Quest Technologies</span>
                  <span className="text-[10px] text-amber-400">VTU Advisory</span>
                </div>
                <div className="p-4 bg-white space-y-2">
                  <p className="font-bold text-slate-900 text-sm">{title}</p>
                  <p className="text-slate-600 leading-relaxed">{message}</p>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 bg-brand-blue text-white rounded-lg font-semibold text-[10px]">
                      Open Student Portal
                    </span>
                  </div>
                </div>
                <div className="p-2.5 text-center text-[10px] text-slate-400 border-t border-slate-100">
                  Automated email from GQT Academic Affairs.
                </div>
              </div>
            </TabsContent>

            {/* SMS Preview */}
            <TabsContent value="sms" className="space-y-3 pt-3">
              <div className="max-w-xs mx-auto p-4 rounded-3xl bg-slate-900 text-white space-y-2 text-xs shadow-soft">
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>VK-GQTIND</span>
                  <span>11:42 AM</span>
                </div>
                <p className="p-2.5 bg-slate-800 rounded-xl leading-relaxed text-slate-200 font-mono text-[11px]">
                  [GQT-VTU Alert]: {title}. {message}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sent History Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
          Broadcast Dispatch History
        </h2>
        <div className="divide-y divide-slate-100 text-xs">
          {history.slice(0, 5).map((h) => (
            <div key={h.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 block">{h.title}</span>
                <span className="text-slate-500 text-[11px] line-clamp-1">
                  {h.message}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                {h.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
