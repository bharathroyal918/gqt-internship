"use client";

import React from "react";
import Link from "next/link";
import categoriesData from "@/data/categories.json";
import {
  Brain,
  Code2,
  Terminal,
  Layers,
  BarChart3,
  ShieldCheck,
  Cloud,
  Palette,
  Megaphone,
  Cpu,
  GitMerge,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Brain,
  Code2,
  Terminal,
  Layers,
  BarChart3,
  ShieldCheck,
  Cloud,
  Palette,
  Megaphone,
  Cpu,
  GitMerge,
  CheckCircle2,
};

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-brand-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
            <span>Specialized Technical Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore 12 Accredited Internship Streams
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
            Curated by Global Quest Technologies to bridge college curriculum with industry technology standards.
          </p>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categoriesData.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Code2;

            return (
              <Link
                key={cat.id}
                href={`/internships?category=${encodeURIComponent(cat.name)}`}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${cat.bgGradient} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-brand-blue transition-colors">
                      {cat.count} Openings
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-brand-blue transition-all" />
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-brand-blue font-semibold">
                  <span>Browse Roles</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
