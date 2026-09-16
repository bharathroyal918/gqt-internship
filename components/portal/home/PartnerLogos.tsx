"use client";

import React from "react";
import companiesData from "@/data/companies.json";
import { Building2 } from "lucide-react";

export default function PartnerLogos() {
  const partners = companiesData.slice(0, 16);

  return (
    <section className="py-12 bg-white border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
          Top Tech & Engineering Giants Hiring Through GQT & VTU
        </p>
      </div>

      <div className="relative w-full overflow-hidden marquee-container">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee marquee-content">
          {partners.concat(partners).map((comp, idx) => (
            <div
              key={`${comp.id}-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-all duration-200 group cursor-pointer"
            >
              <div className="h-8 w-8 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-brand-blue text-xs group-hover:scale-105 transition-transform">
                {comp.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 group-hover:text-brand-blue transition-colors">
                  {comp.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {comp.openRoles} Active Internships
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
