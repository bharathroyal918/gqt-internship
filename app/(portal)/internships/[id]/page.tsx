"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import internshipsData from "@/data/internships.json";
import companiesData from "@/data/companies.json";
import { Internship, Company } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ApplyModal from "@/components/common/ApplyModal";
import CompanyLogo from "@/components/common/CompanyLogo";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Bookmark,
  Share2,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowLeft,
  Briefcase,
  Users,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function InternshipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const internshipId = resolvedParams.id;

  const internship = (internshipsData as Internship[]).find(
    (i) => i.id === internshipId
  );

  if (!internship) {
    notFound();
  }

  const company = (companiesData as Company[]).find(
    (c) => c.name === internship.company
  );

  const related = (internshipsData as Internship[])
    .filter((i) => i.category === internship.category && i.id !== internship.id)
    .slice(0, 3);

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Share link copied to clipboard!");
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success("Saved to your wishlist!");
    } else {
      toast.info("Removed from saved list");
    }
  };

  return (
    <div className="bg-brand-slate min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/internships"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Internships</span>
          </Link>
        </div>

        {/* Hero Banner Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-1 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex-shrink-0">
                <CompanyLogo name={internship.company} size="xl" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {internship.company}
                  </span>
                  <Badge variant="default">{internship.category}</Badge>
                  <Badge variant="navy">{internship.mode}</Badge>
                  <Badge variant="success">Pan-India Accredited</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {internship.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-4 flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {internship.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {internship.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    {internship.vacancies} Vacancies
                  </span>
                </p>
              </div>
            </div>

            {/* Stipend & Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
              <div className="text-left lg:text-right">
                <span className="text-xs text-slate-400 font-medium block">
                  Monthly Stipend:
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 font-mono">
                  {internship.stipend}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={toggleSave}
                  className={`p-3 rounded-xl border transition-colors ${
                    isSaved
                      ? "bg-amber-50 text-amber-500 border-amber-200"
                      : "border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                  title={isSaved ? "Saved" : "Save Internship"}
                  aria-label="Save Internship"
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-amber-500" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                  title="Share Internship"
                  aria-label="Share Internship"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsApplyOpen(true)}
                  className="rounded-xl shadow-soft font-bold flex-1 sm:flex-initial"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Role Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Role Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {internship.aboutRole ||
                  `Global Quest Technologies has partnered with ${internship.company} to offer this high-impact, credit-aligned internship program. Selected students will participate in daily engineering standups, collaborate directly on production codebases, and complete semester internship logs approved by VTU.`}
              </p>
            </div>

            {/* Eligibility & Requirements */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Eligibility & Academic Criteria
              </h2>
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-brand-blue leading-relaxed font-medium">
                {internship.eligibility}
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Key Responsibilities
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-600">
                {internship.responsibilities.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Required Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-semibold border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Outcomes & Certificate */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Learning Outcomes & Industry Certification
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-600">
                {internship.learningOutcomes.map((lo, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <Award className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{lo}</span>
                  </li>
                ))}
              </ul>

              {/* Certificate preview banner */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-brand-navy to-brand-blue text-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Official Verifiable Certificate</h4>
                    <p className="text-[11px] text-slate-300">
                      Contains Cryptographic QR Code for College Guide & HR Verification
                    </p>
                  </div>
                </div>
                <Badge variant="gold">Included</Badge>
              </div>
            </div>

            {/* FAQs regarding this internship */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Frequently Asked Questions
              </h2>
              <Accordion className="space-y-3">
                <AccordionItem title="Will I get university credits for this internship?" defaultOpen>
                  Yes, this internship is formally vetted by Global Quest Technologies under VTU curriculum norms. Upon completion, you will receive an evaluation rubric and certificate accepted for semester credits.
                </AccordionItem>
                <AccordionItem title="How is attendance recorded during remote work?">
                  For remote interns, work is logged through the weekly task diary on the Student Dashboard. College guides and industry mentors approve milestones digitally.
                </AccordionItem>
                <AccordionItem title="Can this lead to a full-time job offer (PPO)?">
                  Over 70% of interns demonstrating strong technical performance and attendance are evaluated for Pre-Placement Interviews (PPI) prior to their 8th semester graduation.
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Timeline Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-blue" />
                Internship Timeline
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Application Deadline:</span>
                  <span className="font-bold text-rose-600 font-mono">
                    {internship.deadline}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Shortlisting Announcement:</span>
                  <span className="font-medium text-slate-800">Within 3 Days</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Cohort Start Date:</span>
                  <span className="font-medium text-slate-800">1st of Next Month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Curriculum Credits:</span>
                  <span className="font-bold text-brand-blue">2 to 3 Credits</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setIsApplyOpen(true)}
                className="w-full rounded-xl mt-2 font-bold"
              >
                Apply for Position
              </Button>
            </div>

            {/* Company Profile Card */}
            {company && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-brand-blue" />
                  About Hiring Company
                </h3>
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-xl bg-white border border-slate-200 shadow-xs flex-shrink-0">
                    <CompanyLogo name={company.name} size="md" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{company.name}</h4>
                    <p className="text-xs text-slate-500">{company.domain}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {company.about}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Active Roles: <strong>{company.openRoles}</strong>
                  </span>
                  <Link
                    href={`/companies/${company.id}`}
                    className="text-brand-blue font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* Related Internships */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Related {internship.category} Roles
              </h3>
              <div className="space-y-3">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/internships/${rel.id}`}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-colors block group"
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      {rel.company}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-blue transition-colors truncate">
                      {rel.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                      <span className="text-emerald-700 font-mono font-bold">
                        {rel.stipend}
                      </span>
                      <span>{rel.mode}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        internship={internship}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
