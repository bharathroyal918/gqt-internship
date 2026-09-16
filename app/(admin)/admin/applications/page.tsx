"use client";

import React, { useState, useMemo } from "react";
import applicantsData from "@/data/applicants.json";
import { Applicant, ApplicationStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Drawer } from "@/components/ui/Drawer";
import { Pagination } from "@/components/ui/Pagination";
import {
  Search,
  Filter,
  FileText,
  User,
  ExternalLink,
  Github,
  Linkedin,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminApplicationsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(
    applicantsData as Applicant[]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Drawers
  const [resumeModalApplicant, setResumeModalApplicant] = useState<Applicant | null>(null);
  const [notesDrawerApplicant, setNotesDrawerApplicant] = useState<Applicant | null>(null);
  const [notesText, setNotesText] = useState("");

  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    let list = [...applicants];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.usn.toLowerCase().includes(q) ||
          a.companyName.toLowerCase().includes(q) ||
          a.internshipTitle.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((a) => a.status === statusFilter);
    }

    if (collegeFilter) {
      list = list.filter((a) =>
        a.college.toLowerCase().includes(collegeFilter.toLowerCase())
      );
    }

    return list;
  }, [applicants, searchTerm, statusFilter, collegeFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (applicantId: string, newStatus: ApplicationStatus) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === applicantId ? { ...app, status: newStatus } : app
      )
    );
    toast.success("Application Status Updated!", {
      description: `Candidate marked as "${newStatus}".`,
    });
  };

  const handleSaveNotes = () => {
    if (!notesDrawerApplicant) return;
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === notesDrawerApplicant.id
          ? { ...app, reviewerNotes: notesText }
          : app
      )
    );
    toast.success("Reviewer remarks recorded!");
    setNotesDrawerApplicant(null);
  };

  const openNotesDrawer = (app: Applicant) => {
    setNotesDrawerApplicant(app);
    setNotesText(app.reviewerNotes || "");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Applicant Tracking & Evaluation ({applicants.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review student submissions, manage interview progression, and endorse candidate offers.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exporting candidate roster to CSV...")}
          className="rounded-xl text-xs"
        >
          <FileSpreadsheet className="h-4 w-4 mr-1 text-emerald-600" />
          <span>Export Applicant Roster</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by candidate name or USN..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            <option value="all">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={collegeFilter}
            onChange={(e) => {
              setCollegeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            <option value="">All Karnataka Colleges</option>
            <option value="RV College">RV College of Engineering</option>
            <option value="BMS College">BMS College of Engineering</option>
            <option value="MSRIT">MS Ramaiah Institute of Technology</option>
            <option value="NIE">NIE Mysore</option>
            <option value="KLE">KLE Tech Hubballi</option>
          </select>
        </div>
      </div>

      {/* Large Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Candidate & USN</th>
                <th className="py-3.5 px-4">Affiliated College</th>
                <th className="py-3.5 px-4">Internship Applied</th>
                <th className="py-3.5 px-4">CGPA</th>
                <th className="py-3.5 px-4">Status Dropdown</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((app) => (
                <tr key={app.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 text-sm block">
                      {app.name}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {app.usn} • {app.branch}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block truncate max-w-[170px]">
                      {app.college}
                    </span>
                    <span className="text-[10px] text-slate-400">Batch {app.graduationYear}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-brand-blue block truncate max-w-[190px]">
                      {app.internshipTitle}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {app.companyName}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-800 font-mono">
                    {app.cgpa}
                  </td>

                  {/* Status Dropdown with live state update */}
                  <td className="py-3.5 px-4">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value as ApplicationStatus)
                      }
                      className="text-xs p-1.5 font-bold rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue cursor-pointer"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview">Interview</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeModalApplicant(app)}
                        className="text-xs h-8 px-2"
                        title="Preview Resume"
                      >
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        <span>Resume</span>
                      </Button>
                      <button
                        onClick={() => openNotesDrawer(app)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-slate-100"
                        title="Reviewer Notes"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} candidates
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Resume Preview Modal */}
      {resumeModalApplicant && (
        <Modal
          isOpen={!!resumeModalApplicant}
          onClose={() => setResumeModalApplicant(null)}
          title={`Candidate Resume: ${resumeModalApplicant.name}`}
          description={`USN: ${resumeModalApplicant.usn} • ${resumeModalApplicant.college}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs text-slate-600">
            {/* Simulated Document Header */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-sans">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-900">
                  {resumeModalApplicant.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {resumeModalApplicant.email} • {resumeModalApplicant.phone}
                </p>
                <p className="text-xs text-brand-blue font-semibold mt-0.5">
                  GitHub: {resumeModalApplicant.githubUrl} • LinkedIn: {resumeModalApplicant.linkedinUrl}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[11px] mb-1">
                  Education
                </h4>
                <p className="font-semibold text-slate-800">
                  {resumeModalApplicant.degree} in {resumeModalApplicant.branch}
                </p>
                <p className="text-slate-500">
                  {resumeModalApplicant.college} • CGPA: <strong>{resumeModalApplicant.cgpa}</strong> (Batch of {resumeModalApplicant.graduationYear})
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[11px] mb-1">
                  Skills & Proficiencies
                </h4>
                <div className="flex flex-wrap gap-1">
                  {resumeModalApplicant.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 font-semibold text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Validated through Karnataka VTU Student Data Exchange
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => toast.success("Resume document downloaded")}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reviewer Notes Drawer */}
      {notesDrawerApplicant && (
        <Drawer
          isOpen={!!notesDrawerApplicant}
          onClose={() => setNotesDrawerApplicant(null)}
          title={`Reviewer Notes: ${notesDrawerApplicant.name}`}
          description={`Internship: ${notesDrawerApplicant.internshipTitle}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-slate-500 block">Candidate:</span>
              <span className="font-bold text-slate-900 block text-sm">
                {notesDrawerApplicant.name} ({notesDrawerApplicant.usn})
              </span>
              <span className="text-slate-500">{notesDrawerApplicant.college}</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Internal Evaluation Remarks
              </label>
              <textarea
                rows={6}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add notes from technical screening, recruiter remarks, or viva scores..."
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotesDrawerApplicant(null)}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveNotes}>
                Save Remarks
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}
