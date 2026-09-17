"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HeroCarousel() {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Search filter states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [minStipend, setMinStipend] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("search", keyword);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (mode) params.set("mode", mode);
    if (minStipend) params.set("minStipend", minStipend);
    router.push(`/internships?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-brand-navy pt-10 pb-20 lg:pb-32 text-white">
      {/* Background Graphic & Subtle Dark Gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        {/* Navy Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Content */}
        <div className="py-6 lg:py-12 max-w-4xl space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>GQT Industry Immersion & Placement Ecosystem</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Launch Your Tech Career with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
              Industry Immersion & Placement Pathways
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Direct access to 100+ accredited corporate internships across Generative AI, Java Full Stack, Python Full Stack, MERN, Data Science and Data Analytics with real-world production codebases and verified digital credentials.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/internships">
              <Button
                variant="primary"
                size="lg"
                className="shadow-soft-lg bg-brand-blue hover:bg-brand-blue-hover text-white font-bold h-12 px-6 rounded-xl"
              >
                <span>Search 100+ Internships</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/companies">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/10 text-white font-semibold h-12 px-6 rounded-xl backdrop-blur-sm"
              >
                <span>Browse Partner Companies</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="ghost"
                size="lg"
                className="text-slate-300 hover:text-white hover:bg-white/5 font-semibold h-12 px-4 rounded-xl"
              >
                <span>Candidate Login →</span>
              </Button>
            </Link>
          </div>

          {/* Key Value & Trust Metrics Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>
                Avg. Stipend: <strong className="text-white font-mono">₹22,500/mo</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-sky-400" />
              <span>
                Placement Rate: <strong className="text-white font-mono">92.4%</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Award className="h-4 w-4 text-amber-400" />
              <span>
                Tech Cohorts: <strong className="text-white">12 Specializations</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-emerald-400">100+ Opportunities Open Today</span>
            </div>
          </div>
        </div>

        {/* Floating Internship Search Card */}
        <div className="mt-8 -mb-28 relative z-20">
          <div className="bg-white rounded-2xl shadow-soft-xl border border-slate-200/80 p-6 lg:p-8 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
              <div>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-brand-blue" />
                  GQT Internship Finder
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Search 100+ Accredited Corporate Internships
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Verified Industry Openings • Apply Today</span>
              </div>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Field 1: Keyword */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Role / Technology / Skill
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. AI, Java, Python, React"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                {/* Field 2: Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-11 pl-10 pr-8 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none cursor-pointer"
                    >
                      <option value="">All Locations & Remote</option>
                      <option value="Bangalore">Bengaluru (Tech Hub / Yelahanka)</option>
                      <option value="Remote">100% Remote / Virtual</option>
                      <option value="Hybrid">Hybrid Engagement</option>
                      <option value="Mysuru">Mysuru</option>
                      <option value="Hubballi">Hubballi - Dharwad</option>
                      <option value="Mangaluru">Mangaluru</option>
                      <option value="Belagavi">Belagavi</option>
                    </select>
                  </div>
                </div>

                {/* Field 3: Internship Mode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Engagement Mode
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      className="w-full h-11 pl-10 pr-8 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none cursor-pointer"
                    >
                      <option value="">All Modes (Remote/Hybrid)</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                </div>

                {/* Field 4: Search Button */}
                <div className="flex items-end gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full h-11 rounded-xl shadow-soft font-bold flex items-center justify-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search Openings</span>
                  </Button>
                </div>
              </div>

              {/* Advanced Filters Drawer Toggle */}
              <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 font-semibold text-brand-blue hover:text-brand-blue-hover"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>{showAdvanced ? "Hide Advanced Filters" : "More Filters (Stipend, Type)"}</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-400">Popular:</span>
                  {["AI Internship", "Java Full Stack", "Python Full Stack", "Data Analytics", "Data Science", "Cyber Security", "DevOps"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setKeyword(cat);
                        router.push(`/internships?category=${encodeURIComponent(cat)}`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-brand-blue text-slate-700 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collapsible Advanced Filters */}
              {showAdvanced && (
                <div className="pt-4 mt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Internship Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    >
                      <option value="">All Internship Types</option>
                      <option value="Full-time">Full-Time Pre-Placement</option>
                      <option value="Curriculum Aligned">Academic & Curriculum Credit Aligned</option>
                      <option value="Summer Internship">Summer Internship (2-3 / 6 Months)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Minimum Monthly Stipend
                    </label>
                    <select
                      value={minStipend}
                      onChange={(e) => setMinStipend(e.target.value)}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    >
                      <option value="">Any Stipend Amount</option>
                      <option value="10000">₹10,000+ / month</option>
                      <option value="20000">₹20,000+ / month</option>
                      <option value="30000">₹30,000+ / month</option>
                    </select>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
