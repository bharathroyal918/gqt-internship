"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Bookmark,
  Calendar,
  Award,
  ArrowRight,
  Video,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import internshipsData from "@/data/internships.json";
import { Internship } from "@/types";
import ApplyModal from "@/components/common/ApplyModal";

export default function StudentDashboardHome() {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const recommended = (internshipsData as Internship[]).slice(0, 3);

  const stats = [
    {
      title: "Applications Submitted",
      value: "6",
      subtext: "2 Shortlisted, 1 Interview",
      icon: Briefcase,
      color: "bg-blue-500",
      href: "/dashboard/applications",
    },
    {
      title: "Saved Internships",
      value: "2",
      subtext: "Ready for quick apply",
      icon: Bookmark,
      color: "bg-amber-500",
      href: "/dashboard/saved",
    },
    {
      title: "Upcoming Interviews",
      value: "1",
      subtext: "Razorpay Tech Round 1",
      icon: Calendar,
      color: "bg-purple-500",
      href: "/dashboard/applications",
    },
    {
      title: "Earned Certificates",
      value: "1",
      subtext: "VTU Hash Verified",
      icon: Award,
      color: "bg-emerald-500",
      href: "/dashboard/certificates",
    },
  ];

  const activities = [
    {
      id: "act-1",
      title: "Interview Slot Confirmed",
      desc: "Razorpay Engineering scheduled Technical Assessment for tomorrow at 11:30 AM IST.",
      time: "2 hours ago",
      type: "interview",
    },
    {
      id: "act-2",
      title: "Application Shortlisted",
      desc: "Infosys Labs moved your Generative AI Research application to Technical Review.",
      time: "Yesterday",
      type: "success",
    },
    {
      id: "act-3",
      title: "College NOC Verified",
      desc: "Prof. K. S. Narayana (Placement Officer) signed digital NOC for your off-campus internship.",
      time: "3 days ago",
      type: "info",
    },
    {
      id: "act-4",
      title: "Certificate Generated",
      desc: "Full Stack Java Cloud Developer certificate minted with cryptographic ID GQT-2026-8819.",
      time: "5 days ago",
      type: "award",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-blue rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Academic Session 2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome Back, Bharath Royal!
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            You have 1 live interview scheduled tomorrow with Wipro Digital and 2 pending recruiter updates. All active applications comply with VTU credit scheme norms.
          </p>
        </div>

        <div className="flex sm:flex-col gap-2 z-10">
          <Link href="/internships">
            <Button variant="gold" size="sm" className="rounded-xl font-bold">
              <span>Find More Internships</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <Link
            key={idx}
            href={s.href}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {s.title}
              </span>
              <div
                className={`h-9 w-9 rounded-xl ${s.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
              >
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {s.value}
              </span>
              <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                <span>{s.subtext}</span>
                <span className="text-brand-blue group-hover:translate-x-0.5 transition-transform font-bold">
                  →
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Section: Upcoming Interview & Profile Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Upcoming Interview & Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Interview Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Video className="h-4 w-4 text-purple-600" />
                <span>Upcoming Technical Interview</span>
              </h2>
              <Badge variant="purple">Confirmed Slot</Badge>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Wipro Digital • Technical Round 1
                  </h3>
                  <p className="text-xs text-slate-600">
                    Role: MERN Stack & Payment Microservices Intern (Batch 2027)
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-purple-800 font-mono block">
                    24 September, 2027 11:30 AM IST
                  </span>
                  <span className="text-[11px] text-slate-500">Duration: 45 Mins</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-purple-200/60 gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Google Meet ID: <strong>meet.google.com/gqt-wipr-intern</strong></span>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-purple-700 hover:bg-purple-800 text-xs h-8 px-4 rounded-lg"
                  onClick={() =>
                    window.open("https://meet.google.com", "_blank")
                  }
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Join Simulated Call</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-4 border-b border-slate-100">
              Recent Application Timeline
            </h2>
            <div className="mt-4 space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="h-2 w-2 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{act.title}</span>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (1 col): Profile Completion + Recommended */}
        <div className="space-y-6">
          {/* Profile Completion Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Profile Readiness
              </h2>
              <span className="text-xs font-bold text-emerald-700 font-mono">
                90% Complete
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[90%]" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Complete your profile to increase recruiter discovery for high-stipend off-campus drives.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Resume Uploaded
                </span>
                <span className="text-slate-400">Done</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" /> College USN Linked
                </span>
                <span className="text-slate-400">Done</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-amber-600">
                  <AlertCircle className="h-3.5 w-3.5" /> Add GitHub Project Link
                </span>
                <Link
                  href="/dashboard/profile"
                  className="text-brand-blue font-bold hover:underline"
                >
                  +15%
                </Link>
              </div>
            </div>

            <Link href="/dashboard/profile" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full rounded-xl text-xs">
                Update Full Profile
              </Button>
            </Link>
          </div>

          {/* Recommended Internships */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recommended For You
              </h2>
              <Link
                href="/internships"
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {recommended.map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/70 transition-colors"
                >
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    {r.company}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 truncate mt-0.5">
                    {r.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span className="font-mono font-bold text-emerald-700">
                      {r.stipend}
                    </span>
                    <button
                      onClick={() => setSelectedInternship(r)}
                      className="text-brand-blue font-semibold hover:underline"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {selectedInternship && (
        <ApplyModal
          internship={selectedInternship}
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </div>
  );
}
