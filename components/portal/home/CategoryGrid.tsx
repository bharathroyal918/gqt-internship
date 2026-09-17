"use client";

import React, { useState } from "react";
import Link from "next/link";
import categoriesData from "@/data/categories.json";
import { InternshipCategory } from "@/types";
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
  Sparkles,
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
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-20 bg-brand-slate" id="specialized-domains">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
            <span>Specialized Technical Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore 12 Accredited Internship Streams
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
            Industry-aligned curriculum curated by Global Quest Technologies with official technology stacks, practical projects, and VTU-compliant internship credits.
          </p>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {(categoriesData as InternshipCategory[]).map((cat) => {
            const IconComponent = iconMap[cat.icon] || Code2;
            const hasError = imageErrors[cat.id];

            return (
              <Link
                key={cat.id}
                href={`/internships?category=${encodeURIComponent(cat.name)}`}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Official Domain Logo + Open Roles Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200/90 p-2 shadow-xs flex items-center justify-center group-hover:scale-105 group-hover:border-blue-300 transition-all flex-shrink-0 relative overflow-hidden">
                        {cat.logo && !hasError ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={cat.logo}
                            alt={`${cat.name} official domain logo`}
                            title={`${cat.name} official tech stack logo`}
                            className="w-full h-full object-contain filter drop-shadow-xs transition-transform group-hover:scale-110"
                            loading="lazy"
                            onError={() => handleImageError(cat.id)}
                          />
                        ) : (
                          <div
                            className={`h-full w-full rounded-xl bg-gradient-to-br ${cat.bgGradient} text-white flex items-center justify-center`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      {/* Small subtle tech icon fallback badge */}
                      <div
                        className={`h-7 w-7 rounded-lg bg-gradient-to-br ${cat.bgGradient} text-white flex items-center justify-center shadow-2xs opacity-80 group-hover:opacity-100 transition-opacity`}
                        title={cat.name}
                      >
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
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

                  {/* Popular Technologies Stack Chips */}
                  {cat.popularTech && cat.popularTech.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {cat.popularTech.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60 group-hover:border-blue-200 group-hover:bg-blue-50/50 group-hover:text-brand-blue transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-brand-blue font-semibold">
                  <span className="flex items-center gap-1">
                    <span>Browse Roles</span>
                    <span className="text-[10px] text-slate-400 font-normal">({cat.count})</span>
                  </span>
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

