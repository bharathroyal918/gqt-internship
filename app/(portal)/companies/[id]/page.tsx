"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import companiesData from "@/data/companies.json";
import internshipsData from "@/data/internships.json";
import { Company, Internship } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ApplyModal from "@/components/common/ApplyModal";
import CompanyLogo from "@/components/common/CompanyLogo";
import {
  Building2,
  MapPin,
  Globe,
  Linkedin,
  Star,
  ShieldCheck,
  Users,
  Briefcase,
  ArrowLeft,
  DollarSign,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const companyId = resolvedParams.id;

  const company = (companiesData as Company[]).find((c) => c.id === companyId);
  if (!company) notFound();

  const hiringInternships = (internshipsData as Internship[]).filter(
    (i) => i.company === company.name
  );

  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  return (
    <div className="bg-brand-slate min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Companies</span>
          </Link>
        </div>

        {/* Company Banner & Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <CompanyLogo
                name={company.name}
                logoUrl={company.logo}
                size="xl"
                className="h-20 w-20 rounded-2xl p-2.5 shadow-sm border border-slate-200/80"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {company.name}
                  </h1>
                  {company.verified && (
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  )}
                  <Badge variant="navy">{company.tier}</Badge>
                </div>
                <p className="text-sm font-medium text-slate-500">{company.domain}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {company.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    {company.employees} Employees
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span>{company.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({company.reviewsCount} reviews)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="flex items-center gap-3">
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-brand-blue" />
                <span>Visit Website</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
              <a
                href={company.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#084e96] transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-2">About the Company</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              {company.about}
            </p>
          </div>
        </div>

        {/* Open Internships for this company */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-brand-blue" />
              <span>Open Internships at {company.name} ({hiringInternships.length})</span>
            </h2>
            <span className="text-xs text-slate-500">
              GQT Accredited Cohorts
            </span>
          </div>

          {hiringInternships.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
              <p className="text-slate-500 text-sm">
                No active public openings right now. Check back soon or register for alerts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hiringInternships.map((int) => (
                <div
                  key={int.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="default">{int.category}</Badge>
                      <Badge variant="navy">{int.mode}</Badge>
                    </div>

                    <Link href={`/internships/${int.id}`}>
                      <h3 className="text-base font-bold text-slate-900 hover:text-brand-blue transition-colors">
                        {int.title}
                      </h3>
                    </Link>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Stipend:</span>
                        <span className="font-bold text-emerald-700 font-mono">
                          {int.stipend}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duration:</span>
                        <span className="font-semibold">{int.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Location:</span>
                        <span className="truncate max-w-[150px]">{int.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/internships/${int.id}`}
                      className="text-xs font-semibold text-slate-600 hover:text-brand-blue"
                    >
                      Details
                    </Link>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedInternship(int)}
                      className="rounded-xl"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
