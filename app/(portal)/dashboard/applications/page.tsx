"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Briefcase,
  Search,
  Filter,
  Calendar,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Download,
} from "lucide-react";
import { ApplicationStatus } from "@/types";
import { toast } from "sonner";

interface StudentApplication {
  id: string;
  internshipTitle: string;
  company: string;
  appliedDate: string;
  status: ApplicationStatus;
  stipend: string;
  location: string;
  notes: string;
  interviewDate?: string;
  offerLetterAvailable?: boolean;
}

const initialApplications: StudentApplication[] = [
  {
    id: "APP-2026-081",
    internshipTitle: "MERN Stack Application Intern",
    company: "Razorpay",
    appliedDate: "10 Sep 2026",
    status: "Interview",
    stipend: "₹30,000 / month",
    location: "Koramangala, Bangalore",
    notes: "Technical Round 1 scheduled for tomorrow at 11:30 AM IST.",
    interviewDate: "Tomorrow, 11:30 AM",
  },
  {
    id: "APP-2026-074",
    internshipTitle: "Generative AI Research Intern",
    company: "Infosys Labs",
    appliedDate: "08 Sep 2026",
    status: "Shortlisted",
    stipend: "₹32,000 / month",
    location: "Electronic City, Bangalore",
    notes: "Shortlisted from RVCE campus pool. Awaiting manager round slot.",
  },
  {
    id: "APP-2026-062",
    internshipTitle: "Cloud Security & SOC Analyst Intern",
    company: "Cisco Systems India",
    appliedDate: "01 Sep 2026",
    status: "Under Review",
    stipend: "₹35,000 / month",
    location: "Cessna Business Park, Bangalore",
    notes: "Resume reviewed by talent acquisition team.",
  },
  {
    id: "APP-2026-055",
    internshipTitle: "Java Full Stack Developer Intern",
    company: "Wipro Digital",
    appliedDate: "28 Aug 2026",
    status: "Selected",
    stipend: "₹28,000 / month",
    location: "Sarjapur Road, Bangalore",
    notes: "Final offer released. Complete college NOC verification.",
    offerLetterAvailable: true,
  },
  {
    id: "APP-2026-041",
    internshipTitle: "DevOps & SRE Engineering Intern",
    company: "PhonePe",
    appliedDate: "20 Aug 2026",
    status: "Applied",
    stipend: "₹34,000 / month",
    location: "Bellandur, Bangalore",
    notes: "Application dispatched to engineering hiring team.",
  },
  {
    id: "APP-2026-029",
    internshipTitle: "Embedded Automotive RTOS Intern",
    company: "Bosch Global Software",
    appliedDate: "15 Aug 2026",
    status: "Rejected",
    stipend: "₹26,000 / month",
    location: "Adugodi, Bangalore",
    notes: "Position filled with candidate possessing prior AUTOSAR coursework.",
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<StudentApplication | null>(null);
  const [withdrawModalApp, setWithdrawModalApp] = useState<StudentApplication | null>(null);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "Selected":
        return <Badge variant="success">Selected</Badge>;
      case "Interview":
        return <Badge variant="purple">Interview Scheduled</Badge>;
      case "Shortlisted":
        return <Badge variant="gold">Shortlisted</Badge>;
      case "Under Review":
        return <Badge variant="default">Under Review</Badge>;
      case "Rejected":
        return <Badge variant="danger">Not Selected</Badge>;
      default:
        return <Badge variant="outline">Applied</Badge>;
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesSearch =
      !searchTerm ||
      app.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleWithdraw = () => {
    if (!withdrawModalApp) return;
    setApplications(applications.filter((a) => a.id !== withdrawModalApp.id));
    toast.info("Application Withdrawn", {
      description: `Your application for ${withdrawModalApp.internshipTitle} was cancelled.`,
    });
    setWithdrawModalApp(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Applications Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track status updates, interview schedules, and university NOC endorsements.
          </p>
        </div>
        <Link href="/internships">
          <Button variant="primary" size="sm" className="rounded-xl">
            Browse New Roles
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Status:</span>
          {[
            "All",
            "Applied",
            "Under Review",
            "Shortlisted",
            "Interview",
            "Selected",
            "Rejected",
          ].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors font-medium ${
                statusFilter === st
                  ? "bg-brand-blue text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Application ID & Role</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Applied Date</th>
                <th className="py-3.5 px-4">Stipend</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono text-[10px] text-slate-400 block font-bold">
                      {app.id}
                    </span>
                    <span className="font-bold text-slate-900 text-sm block">
                      {app.internshipTitle}
                    </span>
                    <span className="text-slate-500 text-[11px]">{app.location}</span>
                  </td>

                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {app.company}
                  </td>

                  <td className="py-4 px-4 font-mono text-slate-500">
                    {app.appliedDate}
                  </td>

                  <td className="py-4 px-4 font-bold text-emerald-700 font-mono">
                    {app.stipend}
                  </td>

                  <td className="py-4 px-4">{getStatusBadge(app.status)}</td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApp(app)}
                        className="text-xs h-8 px-2.5"
                      >
                        View Timeline
                      </Button>
                      {app.status !== "Selected" && app.status !== "Rejected" && (
                        <button
                          onClick={() => setWithdrawModalApp(app)}
                          className="text-[11px] text-rose-500 hover:text-rose-700 hover:underline px-1.5"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Timeline Details Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application Details: ${selectedApp.id}`}
          description={`${selectedApp.internshipTitle} at ${selectedApp.company}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <span className="text-slate-500">Current Status:</span>
              {getStatusBadge(selectedApp.status)}
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">Recruiter Updates & Notes</h4>
              <p className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-slate-700 leading-relaxed">
                {selectedApp.notes}
              </p>
            </div>

            {selectedApp.offerLetterAvailable && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Formal Offer Letter Released</h4>
                  <p className="text-[11px] text-emerald-700">
                    Includes company seal, stipend agreement, and VTU NOC endorsement.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => toast.success("Offer Letter PDF Downloaded!")}
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  <span>Download Offer</span>
                </Button>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Close Window
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Withdraw Modal Confirmation */}
      {withdrawModalApp && (
        <Modal
          isOpen={!!withdrawModalApp}
          onClose={() => setWithdrawModalApp(null)}
          title="Withdraw Application?"
          description="Are you sure you want to withdraw your internship application?"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <p>
              Withdrawing will remove your profile from{" "}
              <strong>{withdrawModalApp.company}</strong>&apos;s active applicant pool.
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWithdrawModalApp(null)}
              >
                Keep Application
              </Button>
              <Button variant="danger" size="sm" onClick={handleWithdraw}>
                Confirm Withdrawal
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
