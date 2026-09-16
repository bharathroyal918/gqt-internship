"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSlide {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
  bgImage: string;
  stats: { label: string; value: string };
}

const slides: HeroSlide[] = [
  {
    badge: "VTU 2026 Academic Internship Drive",
    title: "Empowering Next-Gen Engineers with",
    highlight: "Industry Immersion & Guaranteed Credits",
    subtitle:
      "Direct campus access to 100+ accredited corporate internships across AI, Full Stack, Cloud, and Embedded systems tailored for Karnataka engineering students.",
    ctaPrimary: { text: "Search Internships", href: "/internships" },
    ctaSecondary: { text: "Browse Partner Companies", href: "/companies" },
    bgImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80",
    stats: { label: "Average Verified Stipend", value: "₹22,500/mo" },
  },
  {
    badge: "Bengaluru Tech Summit Placement Cohort",
    title: "Launch Your Dream Career with",
    highlight: "Top Tier-1 Enterprise Tech Giants",
    subtitle:
      "Infosys, Cisco, PhonePe, Razorpay, and Bosch are hiring 2026 passing out batch students for 6-month pre-placement internships.",
    ctaPrimary: { text: "Explore High-Stipend Roles", href: "/internships" },
    ctaSecondary: { text: "View Student Dashboard", href: "/dashboard" },
    bgImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
    stats: { label: "Placement Conversion Rate", value: "92.4%" },
  },
  {
    badge: "Digital Certification & Instant NOC",
    title: "Zero Bureaucracy. Seamless",
    highlight: "University Compliance & Verification",
    subtitle:
      "Automated evaluation rubrics, digital weekly logbooks, and tamper-proof cryptographic QR verification accepted across all VTU affiliated colleges.",
    ctaPrimary: { text: "Apply with Single Click", href: "/internships" },
    ctaSecondary: { text: "Read VTU Circulars", href: "/#circulars" },
    bgImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80",
    stats: { label: "Colleges Onboarded", value: "120+ Campuses" },
  },
];

export default function HeroCarousel() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Search filter states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [minStipend, setMinStipend] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

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

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-brand-navy pt-8 pb-20 lg:pb-32 text-white">
      {/* Background Image Carousel with Gradients */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-30 scale-105" : "opacity-0 scale-100"
            } transform transition-transform duration-7000 ease-out`}
            style={{
              backgroundImage: `url(${s.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* Navy Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Content */}
        <div className="py-8 lg:py-16 max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-400 animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{slide.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            {slide.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
              {slide.highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={slide.ctaPrimary.href}>
              <Button
                variant="primary"
                size="lg"
                className="shadow-soft-lg bg-brand-blue hover:bg-brand-blue-hover text-white font-bold"
              >
                <span>{slide.ctaPrimary.text}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={slide.ctaSecondary.href}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                {slide.ctaSecondary.text}
              </Button>
            </Link>
          </div>

          {/* Stat Overlay Badge */}
          <div className="pt-4 flex items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>
                <strong>{slide.stats.label}:</strong>{" "}
                <span className="text-white font-mono font-bold">
                  {slide.stats.value}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>100+ Opportunities Open Today</span>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Arrows */}
        <div className="flex items-center justify-between pt-4 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-amber-400"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
              }
              className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* SECTION 4 — Floating Internship Search Card (VTU Styled + Modern Razorpay Aesthetic) */}
        <div className="mt-8 -mb-28 relative z-20">
          <div className="bg-white rounded-2xl shadow-soft-xl border border-slate-200/80 p-6 lg:p-8 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
              <div>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-brand-blue" />
                  VTU Internship Finder
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Search 100+ Accredited Corporate Internships
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Real-time Karnataka Student Database</span>
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
                      <option value="">All Karnataka & Remote</option>
                      <option value="Bangalore">Bangalore (Tech Hub)</option>
                      <option value="Mysuru">Mysuru</option>
                      <option value="Hubballi">Hubballi - Dharwad</option>
                      <option value="Mangaluru">Mangaluru</option>
                      <option value="Belagavi">Belagavi</option>
                      <option value="Remote">100% Remote / Virtual</option>
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
                  {["AI Internship", "Java Full Stack", "Cyber Security", "DevOps"].map((cat) => (
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
                      <option value="Academic VTU">Academic VTU (Credit Aligned)</option>
                      <option value="Full-time">Full-Time Pre-Placement</option>
                      <option value="Summer Internship">Summer Internship (2-3 Months)</option>
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
