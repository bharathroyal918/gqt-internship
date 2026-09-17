"use client";

import React from "react";
import Link from "next/link";
import companiesData from "@/data/companies.json";
import { Company } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import CompanyLogo from "@/components/common/CompanyLogo";
import {
  Building2,
  MapPin,
  Users,
  Star,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function CompanyShowcase() {
  const showcaseCompanies = (companiesData as Company[]).slice(0, 8);

  return (
    <section className="py-20 bg-brand-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="h-3.5 w-3.5" />
              <span>Campus Hiring Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Top Tier Companies Hiring Interns
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Explore corporate work cultures, domain specializations, and open student vacancies.
            </p>
          </div>

          <Link href="/companies">
            <Button variant="outline" size="md" className="rounded-xl">
              <span>View All 50 Companies</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseCompanies.map((comp) => (
            <div
              key={comp.id}
              className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Logo & Tier */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-1 rounded-2xl bg-white border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <CompanyLogo name={comp.name} logoUrl={comp.logo} size="lg" />
                  </div>
                  <Badge variant={comp.tier === "Enterprise" ? "navy" : "gold"}>
                    {comp.tier}
                  </Badge>
                </div>

                {/* Company Name */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                  <span className="truncate">{comp.name}</span>
                  {comp.verified && (
                    <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  )}
                </h3>

                <p className="text-xs text-slate-500 mt-1 font-medium truncate">
                  {comp.domain}
                </p>

                {/* Location & Rating */}
                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{comp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span>{comp.rating}</span>
                    </div>
                    <span className="text-slate-400">({comp.reviewsCount} student reviews)</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg">
                  {comp.openRoles} Active Roles
                </span>

                <Link
                  href={`/companies/${comp.id}`}
                  className="text-xs font-semibold text-slate-700 group-hover:text-brand-blue flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
