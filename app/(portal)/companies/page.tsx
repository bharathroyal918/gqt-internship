"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import companiesData from "@/data/companies.json";
import { Company } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import CompanyLogo from "@/components/common/CompanyLogo";
import {
  Search,
  Building2,
  MapPin,
  Star,
  Users,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedTier, setSelectedTier] = useState("");

  const domains = Array.from(
    new Set((companiesData as Company[]).map((c) => c.domain))
  );

  const filtered = useMemo(() => {
    let list = [...(companiesData as Company[])];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }

    if (selectedDomain) {
      list = list.filter((c) => c.domain === selectedDomain);
    }

    if (selectedTier) {
      list = list.filter((c) => c.tier === selectedTier);
    }

    return list;
  }, [search, selectedDomain, selectedTier]);

  const resetFilters = () => {
    setSearch("");
    setSelectedDomain("");
    setSelectedTier("");
  };

  return (
    <div className="bg-brand-slate min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="h-3.5 w-3.5" />
            <span>Corporate Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            50+ Partner Tech Companies & GCCs
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Explore industry leaders hiring engineering students across India for accredited corporate internship programs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by company name, technology, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue cursor-pointer"
              >
                <option value="">All Industry Domains</option>
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue cursor-pointer"
              >
                <option value="">All Company Tiers</option>
                <option value="Enterprise">Enterprise MNCs</option>
                <option value="Global Partner">Global Technology Partners</option>
                <option value="Scale-up">Scale-ups & Unicorns</option>
                <option value="Startup">GQT Incubation Startups</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing <strong>{filtered.length}</strong> verified corporate partners
            </span>
            {(search || selectedDomain || selectedTier) && (
              <button
                onClick={resetFilters}
                className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Companies Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No companies found"
            description="Try changing your domain filter or search keyword."
            actionText="Clear Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((comp) => (
              <div
                key={comp.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-1 rounded-2xl bg-white border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                      <CompanyLogo name={comp.name} logoUrl={comp.logo} size="lg" />
                    </div>
                    <Badge variant={comp.tier === "Enterprise" ? "navy" : "gold"}>
                      {comp.tier}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                    <span>{comp.name}</span>
                    {comp.verified && (
                      <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    )}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-1">
                    {comp.domain}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{comp.location}</span>
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                        <span>{comp.rating}</span>
                      </div>
                      <span className="text-slate-400">({comp.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {comp.about}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg">
                    {comp.openRoles} Open Roles
                  </span>

                  <Link
                    href={`/companies/${comp.id}`}
                    className="text-xs font-semibold text-slate-700 group-hover:text-brand-blue flex items-center gap-1"
                  >
                    <span>View Company</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
