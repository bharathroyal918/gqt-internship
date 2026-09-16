"use client";

import React, { useState, useEffect } from "react";
import { Users, Briefcase, Building2, GraduationCap, Award, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  count: number;
  suffix: string;
  icon: any;
  desc: string;
}

const stats: StatItem[] = [
  {
    label: "Students Trained & Placed",
    count: 45000,
    suffix: "+",
    icon: Users,
    desc: "Across 30 districts in Karnataka",
  },
  {
    label: "Accredited Internships Posted",
    count: 1200,
    suffix: "+",
    icon: Briefcase,
    desc: "100% compliant with VTU credit scheme",
  },
  {
    label: "Corporate Hiring Partners",
    count: 350,
    suffix: "+",
    icon: Building2,
    desc: "MNCs, Startups & Global GCCs",
  },
  {
    label: "Affiliated Colleges & Campuses",
    count: 120,
    suffix: "+",
    icon: GraduationCap,
    desc: "Autonomous & VTU partner institutes",
  },
  {
    label: "Pre-Placement Offers (PPO)",
    count: 8500,
    suffix: "+",
    icon: Award,
    desc: "Average CTC ₹6.8 LPA",
  },
];

export default function StatsCounter() {
  const [animatedCounts, setAnimatedCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const duration = 1800; // ms
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedCounts(
        stats.map((s) => Math.floor(s.count * Math.min(1, progress)))
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Impact at Scale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Karnataka’s Largest Technical Internship Ecosystem
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Proven track record of empowering students with real-world engineering skills and career outcomes.
          </p>
        </div>

        {/* Stats Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
              >
                <div className="h-12 w-12 rounded-2xl bg-brand-blue/30 text-amber-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  {animatedCounts[idx].toLocaleString("en-IN")}
                  <span className="text-amber-400">{stat.suffix}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-200 mt-2">
                  {stat.label}
                </h4>

                <p className="text-[11px] text-slate-400 mt-1">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
