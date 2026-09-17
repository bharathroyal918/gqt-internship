"use client";

import React, { useState } from "react";
import Link from "next/link";
import CompanyLogo from "@/components/common/CompanyLogo";
import { Badge } from "@/components/ui/Badge";
import {
  Building2,
  ShieldCheck,
  MapPin,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";

export interface HiringGiant {
  id: string;
  name: string;
  logoUrl: string;
  category: "big-tech" | "it-titans" | "automotive" | "semiconductor" | "fintech";
  categoryLabel: string;
  domain: string;
  stipend: string;
  openRoles: number;
  featuredRole: string;
  location: string;
  tier: "Global Partner" | "Enterprise" | "Product Lab";
}

export const TOP_HIRING_GIANTS: HiringGiant[] = [
  {
    id: "giant-google",
    name: "Google",
    logoUrl: "/images/companies/google.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "Cloud Infrastructure, Distributed Systems & GenAI",
    stipend: "₹45,000 / mo",
    openRoles: 14,
    featuredRole: "Software Engineering & Cloud AI Intern",
    location: "Bengaluru, Hyderabad & Remote",
    tier: "Global Partner",
  },
  {
    id: "giant-microsoft",
    name: "Microsoft",
    logoUrl: "/images/companies/microsoft.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "Azure Cloud, Applied Machine Learning & Systems",
    stipend: "₹42,000 / mo",
    openRoles: 16,
    featuredRole: "Azure Cloud & Copilot AI Engineering Intern",
    location: "Bengaluru, Hyderabad, Noida",
    tier: "Global Partner",
  },
  {
    id: "giant-amazon",
    name: "Amazon",
    logoUrl: "/images/companies/amazon.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "AWS Cloud, Distributed Microservices & Logistics Tech",
    stipend: "₹40,000 / mo",
    openRoles: 22,
    featuredRole: "SDE Intern (Full Stack & Backend Platforms)",
    location: "Bengaluru, Chennai, Hyderabad",
    tier: "Global Partner",
  },
  {
    id: "giant-tcs",
    name: "Tata Consultancy Services",
    logoUrl: "/images/companies/tcs.jpg",
    category: "it-titans",
    categoryLabel: "IT Titans & GCCs",
    domain: "Enterprise Cloud, Digital Transformation & AI Solutions",
    stipend: "₹25,000 / mo",
    openRoles: 35,
    featuredRole: "Digital Systems & Full Stack Java Intern",
    location: "Pan-India (Bengaluru, Pune, Mumbai, Hyderabad)",
    tier: "Enterprise",
  },
  {
    id: "giant-infosys",
    name: "Infosys Labs",
    logoUrl: "/images/companies/infosys.svg",
    category: "it-titans",
    categoryLabel: "IT Titans & GCCs",
    domain: "Cloud Native, Modern Web Engineering & Automation",
    stipend: "₹24,000 / mo",
    openRoles: 28,
    featuredRole: "Full Stack Java & Cloud Integration Intern",
    location: "Electronic City, Bengaluru & Mysuru",
    tier: "Enterprise",
  },
  {
    id: "giant-wipro",
    name: "Wipro Digital",
    logoUrl: "/images/companies/wipro.svg",
    category: "it-titans",
    categoryLabel: "IT Titans & GCCs",
    domain: "Cyber Security, DevOps Automation & Cloud Ops",
    stipend: "₹22,000 / mo",
    openRoles: 20,
    featuredRole: "DevOps & Cloud Security Engineering Intern",
    location: "Sarjapur Road, Bengaluru & Hyderabad",
    tier: "Enterprise",
  },
  {
    id: "giant-cognizant",
    name: "Cognizant",
    logoUrl: "/images/companies/cognizant.svg",
    category: "it-titans",
    categoryLabel: "IT Titans & GCCs",
    domain: "Enterprise Digital Platforms & Generative AI Practice",
    stipend: "₹23,000 / mo",
    openRoles: 24,
    featuredRole: "Data Engineering & Analytics Intern",
    location: "Bengaluru, Chennai, Coimbatore",
    tier: "Enterprise",
  },
  {
    id: "giant-bosch",
    name: "Bosch Global Software",
    logoUrl: "/images/companies/bosch.svg",
    category: "automotive",
    categoryLabel: "Automotive & Core R&D",
    domain: "Automotive Embedded Systems, IoT & ADAS Mobility",
    stipend: "₹30,000 / mo",
    openRoles: 18,
    featuredRole: "Embedded C & AUTOSAR Firmware Intern",
    location: "Adugodi, Bengaluru & Coimbatore",
    tier: "Global Partner",
  },
  {
    id: "giant-cisco",
    name: "Cisco Systems",
    logoUrl: "/images/companies/cisco.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "Cloud Networking, Cyber Security & SDN Architecture",
    stipend: "₹35,000 / mo",
    openRoles: 15,
    featuredRole: "Network Security & Python Automation Intern",
    location: "Outer Ring Road, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-mercedes",
    name: "Mercedes-Benz",
    logoUrl: "/images/companies/mercedes.svg",
    category: "automotive",
    categoryLabel: "Automotive & Core R&D",
    domain: "Connected Vehicles, Autonomous Driving & Telematics",
    stipend: "₹32,000 / mo",
    openRoles: 14,
    featuredRole: "Connected Vehicle Software & Infotainment Intern",
    location: "Whitefield, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-intel",
    name: "Intel",
    logoUrl: "/images/companies/intel.svg",
    category: "semiconductor",
    categoryLabel: "Semiconductor & Hardware",
    domain: "Silicon Architecture, FPGA Design & Edge AI Hardware",
    stipend: "₹38,000 / mo",
    openRoles: 12,
    featuredRole: "VLSI Architecture & Embedded Firmware Intern",
    location: "Outer Ring Road, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-dell",
    name: "Dell Technologies",
    logoUrl: "/images/companies/dell.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "Hybrid Cloud Storage, Distributed Systems & Infrastructure",
    stipend: "₹30,000 / mo",
    openRoles: 15,
    featuredRole: "Cloud Infrastructure & Storage Software Intern",
    location: "Domlur, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-ibm",
    name: "IBM",
    logoUrl: "/images/companies/ibm.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "Hybrid Cloud, Red Hat OpenShift & watsonx Enterprise AI",
    stipend: "₹32,000 / mo",
    openRoles: 16,
    featuredRole: "watsonx Generative AI & Cloud Microservices Intern",
    location: "Manyata Tech Park, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-accenture",
    name: "Accenture",
    logoUrl: "/images/companies/accenture.svg",
    category: "it-titans",
    categoryLabel: "IT Titans & GCCs",
    domain: "Cloud Modernization, Enterprise ERP & Data Analytics",
    stipend: "₹25,000 / mo",
    openRoles: 30,
    featuredRole: "Cloud Platform Modernization Intern",
    location: "Bengaluru, Gurugram, Hyderabad",
    tier: "Enterprise",
  },
  {
    id: "giant-samsung",
    name: "Samsung",
    logoUrl: "/images/companies/samsung.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "Mobile AI, Computer Vision, 5G Protocols & Smart OS",
    stipend: "₹35,000 / mo",
    openRoles: 14,
    featuredRole: "On-Device AI & Computer Vision Intern",
    location: "Phoenix Marketcity, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-siemens",
    name: "Siemens",
    logoUrl: "/images/companies/siemens.svg",
    category: "automotive",
    categoryLabel: "Automotive & Core R&D",
    domain: "Industrial IoT, Digital Twin, PLC & Smart Grids",
    stipend: "₹28,000 / mo",
    openRoles: 12,
    featuredRole: "Industrial Automation & Digital Twin Intern",
    location: "Electronic City, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-qualcomm",
    name: "Qualcomm",
    logoUrl: "/images/companies/qualcomm.svg",
    category: "semiconductor",
    categoryLabel: "Semiconductor & Hardware",
    domain: "Snapdragon 5G, DSP, Edge AI & Embedded Linux",
    stipend: "₹40,000 / mo",
    openRoles: 11,
    featuredRole: "Embedded Linux & 5G Modem Firmware Intern",
    location: "Bengaluru & Hyderabad",
    tier: "Global Partner",
  },
  {
    id: "giant-oracle",
    name: "Oracle",
    logoUrl: "/images/companies/oracle.svg",
    category: "big-tech",
    categoryLabel: "Global Big Tech",
    domain: "Autonomous DB, OCI Cloud Infrastructure & Fusion ERP",
    stipend: "₹32,000 / mo",
    openRoles: 14,
    featuredRole: "OCI Cloud Infrastructure & Database Intern",
    location: "Marathahalli, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-lnt",
    name: "L&T Technology Services",
    logoUrl: "/images/companies/ltts.png",
    category: "automotive",
    categoryLabel: "Automotive & Core R&D",
    domain: "Industrial Robotics, Smart Factories & Embedded ER&D",
    stipend: "₹26,000 / mo",
    openRoles: 18,
    featuredRole: "Industrial IoT & Embedded Firmware Intern",
    location: "Hebbal, Bengaluru & Mysuru",
    tier: "Enterprise",
  },
  {
    id: "giant-phonepe",
    name: "PhonePe",
    logoUrl: "/images/companies/phonepe.svg",
    category: "fintech",
    categoryLabel: "FinTech & Product Unicorns",
    domain: "High-Throughput UPI, Microservices & Payments Cloud",
    stipend: "₹35,000 / mo",
    openRoles: 12,
    featuredRole: "Backend Distributed Systems & UPI Intern",
    location: "Bellandur, Bengaluru",
    tier: "Product Lab",
  },
  {
    id: "giant-razorpay",
    name: "Razorpay",
    logoUrl: "/images/companies/razorpay.svg",
    category: "fintech",
    categoryLabel: "FinTech & Product Unicorns",
    domain: "Payment Gateways, Neo-Banking APIs & Real-Time Risk AI",
    stipend: "₹34,000 / mo",
    openRoles: 10,
    featuredRole: "Full Stack React & API Engineering Intern",
    location: "Koramangala, Bengaluru",
    tier: "Product Lab",
  },
  {
    id: "giant-flipkart",
    name: "Flipkart",
    logoUrl: "/images/companies/flipkart.svg",
    category: "fintech",
    categoryLabel: "FinTech & Product Unicorns",
    domain: "E-Commerce Cloud, Supply Chain AI & Recommendation Engines",
    stipend: "₹36,000 / mo",
    openRoles: 16,
    featuredRole: "Data Science & Supply Chain Algorithms Intern",
    location: "Bellandur, Bengaluru",
    tier: "Product Lab",
  },
  {
    id: "giant-ti",
    name: "Texas Instruments",
    logoUrl: "/images/companies/ti.svg",
    category: "semiconductor",
    categoryLabel: "Semiconductor & Hardware",
    domain: "Analog Signal Processing, Microcontrollers & Power Systems",
    stipend: "₹36,000 / mo",
    openRoles: 9,
    featuredRole: "Analog Circuit & Embedded Microcontroller Intern",
    location: "Bagmane Tech Park, Bengaluru",
    tier: "Global Partner",
  },
  {
    id: "giant-honeywell",
    name: "Honeywell",
    logoUrl: "/images/companies/honeywell.svg",
    category: "automotive",
    categoryLabel: "Automotive & Core R&D",
    domain: "Aerospace Avionics, Connected Buildings & Industrial Sensors",
    stipend: "₹28,000 / mo",
    openRoles: 12,
    featuredRole: "Avionics Software & Embedded C Intern",
    location: "Devarabisanahalli, Bengaluru",
    tier: "Global Partner",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Giants (24)" },
  { id: "big-tech", label: "Global Big Tech" },
  { id: "it-titans", label: "IT Titans & GCCs" },
  { id: "automotive", label: "Automotive & Core R&D" },
  { id: "semiconductor", label: "Semiconductor & Hardware" },
  { id: "fintech", label: "FinTech & High-Growth" },
];

export default function PartnerLogos() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredGiants =
    selectedCategory === "all"
      ? TOP_HIRING_GIANTS
      : TOP_HIRING_GIANTS.filter((g) => g.category === selectedCategory);

  // Marquee lanes for smooth bi-directional visual movement
  const marqueeLane1 = TOP_HIRING_GIANTS.slice(0, 12);
  const marqueeLane2 = TOP_HIRING_GIANTS.slice(12, 24);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-slate-200/80 overflow-hidden relative">
      {/* Decorative ambient gradient spots */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="h-3.5 w-3.5 text-brand-blue" />
            <span>Campus & Corporate Hiring Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Top Tech & Engineering Giants Hiring Through GQT Internship
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Fortune 500 tech leaders, Tier-1 multinational product labs, and automotive
            engineering centers recruit aspiring engineers across India through GQT&apos;s
            structured corporate internship cohorts.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-brand-blue text-white shadow-md shadow-blue-500/20 scale-105"
                    : "bg-white text-slate-600 hover:text-brand-blue hover:bg-blue-50/60 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured Tech Giants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {filteredGiants.slice(0, 12).map((giant) => (
            <div
              key={giant.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Proper Corporate Logo & Tier Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-1 rounded-2xl bg-white border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform">
                    <CompanyLogo name={giant.name} logoUrl={giant.logoUrl} size="lg" />
                  </div>
                  <Badge
                    variant={
                      giant.tier === "Global Partner"
                        ? "navy"
                        : giant.tier === "Enterprise"
                        ? "default"
                        : "gold"
                    }
                    className="text-[10px] px-2.5 py-0.5"
                  >
                    {giant.tier}
                  </Badge>
                </div>

                {/* Company Name & Verification */}
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {giant.name}
                  </h3>
                  <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                </div>

                {/* Category Label */}
                <span className="text-[11px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-2">
                  {giant.categoryLabel}
                </span>

                {/* Domain & Tech Focus */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {giant.domain}
                </p>

                {/* Featured Role */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-0.5">
                    <Briefcase className="h-3 w-3 text-slate-400" />
                    <span>Featured Opening:</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">
                    {giant.featuredRole}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                  <MapPin className="h-3 w-3 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{giant.location}</span>
                </div>
              </div>

              {/* Card Footer: Stipend & Link to Internships */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Avg. Stipend
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 font-mono">
                    {giant.stipend}
                  </span>
                </div>

                <Link
                  href={`/internships?search=${encodeURIComponent(giant.name)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-blue-hover group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{giant.openRoles} Roles</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Corporate Partners Callout */}
        <div className="text-center mb-16">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs shadow-soft hover:shadow-card-hover transition-all"
          >
            <span>Explore All 50+ Verified Corporate Hiring Partners</span>
            <ArrowRight className="h-4 w-4 text-brand-blue" />
          </Link>
        </div>
      </div>

      {/* Infinite Bi-Directional Corporate Marquee Strip */}
      <div className="w-full bg-white py-6 border-y border-slate-200/80 shadow-xs space-y-4">
        <div className="text-center mb-2">
          <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
            Continuous Live Campus Hiring Drives &bull; Updated Daily
          </p>
        </div>

        {/* Lane 1: Leftward Scrolling (Big Tech & Cloud Leaders) */}
        <div className="relative w-full overflow-hidden marquee-container">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee marquee-content">
            {marqueeLane1.concat(marqueeLane1).map((comp, idx) => (
              <Link
                key={`lane1-${comp.id}-${idx}`}
                href={`/internships?search=${encodeURIComponent(comp.name)}`}
                className="inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 group cursor-pointer"
              >
                <div className="p-0.5 rounded-xl bg-white border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform">
                  <CompanyLogo name={comp.name} logoUrl={comp.logoUrl} size="sm" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {comp.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {comp.openRoles} Active Internships
                  </span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* Lane 2: Rightward Scrolling (Automotive, Semiconductor & IT Giants) */}
        <div className="relative w-full overflow-hidden marquee-container">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee-reverse marquee-content">
            {marqueeLane2.concat(marqueeLane2).map((comp, idx) => (
              <Link
                key={`lane2-${comp.id}-${idx}`}
                href={`/internships?search=${encodeURIComponent(comp.name)}`}
                className="inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 group cursor-pointer"
              >
                <div className="p-0.5 rounded-xl bg-white border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform">
                  <CompanyLogo name={comp.name} logoUrl={comp.logoUrl} size="sm" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {comp.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {comp.openRoles} Active Internships
                  </span>
                </div>
                <span className="h-2 w-2 rounded-full bg-blue-500 ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Advantage Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-brand-blue flex-shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% Verified Drives</p>
              <p className="text-[11px] text-slate-500">Authorized corporate partners</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">₹45,000 / mo Highest</p>
              <p className="text-[11px] text-slate-500">Competitive paid stipends</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">PPO Opportunities</p>
              <p className="text-[11px] text-slate-500">Direct pre-placement offers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Direct Tech Gateway</p>
              <p className="text-[11px] text-slate-500">Skip preliminary resume screening</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
