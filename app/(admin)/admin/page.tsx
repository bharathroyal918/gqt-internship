"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Building2,
  GraduationCap,
  TrendingUp,
  Award,
  ArrowUpRight,
  Clock,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import applicantsData from "@/data/applicants.json";
import internshipsData from "@/data/internships.json";
import collegesData from "@/data/colleges.json";
import companiesData from "@/data/companies.json";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const monthlyApplicationData = [
  { month: "Apr", applications: 420, placements: 85 },
  { month: "May", applications: 680, placements: 140 },
  { month: "Jun", applications: 1150, placements: 310 },
  { month: "Jul", applications: 1980, placements: 640 },
  { month: "Aug", applications: 2840, placements: 920 },
  { month: "Sep", applications: 3650, placements: 1420 },
];

const categoryData = [
  { name: "Full Stack Java/Python", value: 38, color: "#0B5ED7" },
  { name: "AI & Data Science", value: 26, color: "#8B5CF6" },
  { name: "Cloud & DevOps", value: 18, color: "#0284C7" },
  { name: "Embedded & IoT", value: 12, color: "#16A34A" },
  { name: "Cyber & Testing", value: 6, color: "#F59E0B" },
];

const collegeParticipationData = [
  { college: "RVCE", students: 480 },
  { college: "BMSCE", students: 440 },
  { college: "MSRIT", students: 410 },
  { college: "NIE Mysuru", students: 350 },
  { college: "KLE Hubballi", students: 320 },
  { college: "PESIT", students: 290 },
];

export default function AdminDashboardPage() {
  const recentApplicants = applicantsData.slice(0, 5);
  const recentInternships = internshipsData.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            GQT Executive Portal Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry of VTU 2026 academic internships, applicants, and corporate partners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/internships/new">
            <Button variant="primary" size="md" className="rounded-xl shadow-soft font-bold">
              <Plus className="h-4 w-4 mr-1" />
              <span>Post New Internship</span>
            </Button>
          </Link>
          <Link href="/admin/reports">
            <Button variant="outline" size="md" className="rounded-xl">
              <span>Export Reports</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            title: "Total Applicants",
            val: "10,840",
            trend: "+24.5% this month",
            icon: Users,
            color: "text-blue-600 bg-blue-50",
          },
          {
            title: "Active Internships",
            val: "100",
            trend: "Across 12 domains",
            icon: Briefcase,
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            title: "Partner Colleges",
            val: "30",
            trend: "VTU engineering campuses",
            icon: GraduationCap,
            color: "text-purple-600 bg-purple-50",
          },
          {
            title: "Hiring Companies",
            val: "50",
            trend: "Enterprise & GCCs",
            icon: Building2,
            color: "text-amber-600 bg-amber-50",
          },
          {
            title: "Placement Rate",
            val: "91.8%",
            trend: "VTU credit confirmed",
            icon: Award,
            color: "text-rose-600 bg-rose-50",
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {kpi.title}
              </span>
              <div className={`p-2 rounded-xl ${kpi.color}`}>
                <kpi.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {kpi.val}
              </span>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3 text-emerald-600" />
                <span>{kpi.trend}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Application & Placement Trend (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Application & Placement Trajectory (2026 Batch)
              </h2>
              <p className="text-xs text-slate-500">
                Monthly student submissions vs accepted pre-placement offers
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-brand-blue"></span>
                Applications
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Placements
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyApplicationData}>
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B5ED7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0B5ED7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPlace" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#0B5ED7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorApp)"
                />
                <Area
                  type="monotone"
                  dataKey="placements"
                  stroke="#16A34A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPlace)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Domain Breakdown (1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Internship Domain Share
            </h2>
            <p className="text-xs text-slate-500">
              Distribution of active corporate openings
            </p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate max-w-[170px]">{item.name}</span>
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Applications & Recent Internships */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications Table */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recent Student Applications
              </h2>
              <p className="text-xs text-slate-500">Live feed from VTU portal network</p>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-brand-blue hover:underline"
            >
              View All 40 →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {recentApplicants.map((app) => (
              <div
                key={app.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-slate-900">{app.name}</h3>
                  <p className="text-slate-500 text-[11px]">
                    {app.usn} • {app.college}
                  </p>
                  <p className="text-slate-600 font-medium text-[11px] mt-0.5">
                    {app.internshipTitle} ({app.companyName})
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <Badge
                    variant={
                      app.status === "Interview"
                        ? "purple"
                        : app.status === "Shortlisted"
                        ? "gold"
                        : "default"
                    }
                  >
                    {app.status}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {app.appliedDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top College Participation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Campus Participation Volume
              </h2>
              <p className="text-xs text-slate-500">Students registered per institute</p>
            </div>
            <Link
              href="/admin/colleges"
              className="text-xs font-semibold text-brand-blue hover:underline"
            >
              View 30 Colleges →
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collegeParticipationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <YAxis dataKey="college" type="category" tick={{ fontSize: 11 }} stroke="#94A3B8" width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="students" fill="#0B5ED7" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
