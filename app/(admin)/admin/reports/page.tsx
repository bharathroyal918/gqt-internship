"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  TrendingUp,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { toast } from "sonner";

const placementByDept = [
  { dept: "Computer Science (CSE)", offers: 540, applied: 1420 },
  { dept: "Information Science (ISE)", offers: 410, applied: 1100 },
  { dept: "Electronics & Comm (ECE)", offers: 320, applied: 950 },
  { dept: "AI & Machine Learning (AIML)", offers: 280, applied: 650 },
  { dept: "Data Science (DS)", offers: 190, applied: 480 },
];

const topHiringCompanies = [
  { company: "Infosys Labs", hired: 142 },
  { company: "Wipro Digital", hired: 118 },
  { company: "TCS Enterprise", hired: 95 },
  { company: "Bosch Global", hired: 84 },
  { company: "PhonePe", hired: 62 },
  { company: "Razorpay", hired: 58 },
];

export default function AdminReportsPage() {
  const [reportCohort, setReportCohort] = useState("2026 Batch");

  const exportReport = (format: string) => {
    toast.success(`Generating ${format.toUpperCase()} Report...`, {
      description: `VTU Internship & Placement Analytics ${reportCohort}.${format}`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Placement & Internship Analytics Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official audit reports compliant with VTU and AICTE annual curriculum compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportReport("csv")}
            className="rounded-xl text-xs"
          >
            <FileSpreadsheet className="h-4 w-4 mr-1 text-emerald-600" />
            <span>Export CSV</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => exportReport("pdf")}
            className="rounded-xl font-bold text-xs"
          >
            <Download className="h-4 w-4 mr-1" />
            <span>Download Annual Report (PDF)</span>
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Conversion Rates */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Department-wise Placements
              </h2>
              <p className="text-xs text-slate-500">
                Applied candidates vs confirmed internship offers
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">2026 Batch</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementByDept}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="dept" tick={{ fontSize: 10 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="applied" name="Total Applied" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="offers" name="Offers Accepted" fill="#0B5ED7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Hiring Companies */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Top Hiring Enterprises
              </h2>
              <p className="text-xs text-slate-500">
                Number of VTU students onboarded per firm
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Verified Offers</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topHiringCompanies} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <YAxis dataKey="company" type="category" tick={{ fontSize: 11 }} stroke="#94A3B8" width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="hired" fill="#16A34A" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
