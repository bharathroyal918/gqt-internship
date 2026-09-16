"use client";

import React from "react";
import Link from "next/link";
import collegesData from "@/data/colleges.json";
import {
  GraduationCap,
  Target,
  Eye,
  Heart,
  Rocket,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const milestones = [
  {
    year: "2018",
    title: "Inception of Global Quest Technologies",
    description:
      "Founded in Bengaluru with a core mission to bridge the engineering education syllabus with Tier-1 product company requirements.",
  },
  {
    year: "2020",
    title: "Statewide VTU Internship Accreditation",
    description:
      "Formally partnered with premier engineering institutes in Karnataka to deliver compliant, semester-credit aligned industrial internships.",
  },
  {
    year: "2022",
    title: "Launch of GQT Career Launch Foundation",
    description:
      "Introduced fully funded CSR cohorts for tier-2 and tier-3 rural engineering colleges, training 15,000+ underprivileged scholars.",
  },
  {
    year: "2024",
    title: "Bengaluru Tech Summit Placement Partner",
    description:
      "Recognized by Government of Karnataka IT-BT Department as official technical skills provider with 8,500+ pre-placement conversions.",
  },
  {
    year: "2026",
    title: "AI-Powered Real-Time Portal",
    description:
      "Unified portal infrastructure connecting 120+ colleges, 350+ enterprises, and over 100,000 students on a single verified platform.",
  },
];

const leadership = [
  {
    name: "Dr. Arvind K. Swamy",
    role: "Managing Director & CEO",
    bio: "Ex-Director at Infosys Labs, IIT Madras alumnus with 25+ years shaping high-growth engineering organizations.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Dr. Malathi N. Rao",
    role: "Chief Academic Officer",
    bio: "Former Dean of Engineering at VTU with extensive research leadership in curriculum reform and AICTE guidelines.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sandeep V. Murthy",
    role: "Head of Industry Alliances",
    bio: "Former Global Campus Recruitment Lead at Cisco, directing university immersion partnerships across India.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Priyanka S. Deshpande",
    role: "Director of Student Placement & CSR",
    bio: "Passionate social entrepreneur heading GQT Career Launch across 30 Karnataka districts.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-slate min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="h-4 w-4" />
            <span>Building Karnataka’s Engineering Future</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About Global Quest Technologies
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Pioneering industry-integrated experiential education, technical internships, and campus placement acceleration in formal partnership with VTU.
          </p>
        </div>
      </section>

      {/* Mission, Vision, CSR */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To democratize Tier-1 corporate engineering internships for every engineering student in Karnataka, irrespective of geographic location, by delivering industry-vetted project training and structured mentorship.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <Eye className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be the most reliable, transparent, and comprehensive university-to-corporate bridge in India, graduating 100,000+ industry-ready software, AI, and embedded engineers annually.
            </p>
          </div>

          {/* CSR */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all">
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">CSR & Rural Outreach</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Through the GQT Foundation, we sponsor 100% free hardware toolkits, cloud credits, and certification waivers for economically backward and rural engineering colleges across North and Coastal Karnataka.
            </p>
          </div>
        </div>
      </section>

      {/* Career Launch Program Spotlight */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light rounded-3xl p-8 lg:p-12 text-white shadow-soft-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Rocket className="h-4 w-4" /> Flagship Initiative
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                GQT Career Launch Program 2026
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                An intensive 16-week pre-placement immersion program combining live industry code sprints, mock technical panels with engineering managers from Microsoft, PhonePe & Bosch, and guaranteed interview shortlists.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="font-bold text-white block text-sm">100%</span>
                  <span className="text-slate-300">Curriculum Credits</span>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="font-bold text-white block text-sm">1:1 Mentorship</span>
                  <span className="text-slate-300">Silicon Valley Mentors</span>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="font-bold text-white block text-sm">₹6.8 LPA</span>
                  <span className="text-slate-300">Avg Placement CTC</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/internships">
                <Button variant="gold" size="lg" className="rounded-xl font-bold">
                  <span>Explore Program Openings</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Milestone Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Journey of Impact
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Milestones that define our commitment to Karnataka’s technical education.
          </p>
        </div>

        <div className="relative border-l-2 border-brand-blue/30 ml-4 sm:ml-32 space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-8 group">
              {/* Year indicator dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-white border-4 border-brand-blue group-hover:scale-125 transition-transform shadow-sm" />
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft max-w-2xl">
                <span className="text-xs font-extrabold text-brand-blue font-mono bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{m.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Executive Leadership & Advisory
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Seasoned educationists, industry leaders, and technical architects driving student success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((l, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center space-y-4 hover:shadow-soft transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.photo}
                  alt={l.name}
                  className="h-24 w-24 rounded-full object-cover mx-auto border-2 border-brand-blue shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{l.name}</h3>
                  <p className="text-xs text-brand-blue font-semibold mt-0.5">{l.role}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Colleges Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            30+ Network Engineering Colleges
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Top Visvesvaraya Technological University (VTU) affiliated engineering colleges actively participating in GQT internship cohorts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {collegesData.slice(0, 18).map((col) => (
            <div
              key={col.id}
              className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-soft hover:border-brand-blue/60 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs flex items-center justify-center mx-auto mb-2">
                {col.shortCode}
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {col.shortCode}
              </h4>
              <p className="text-[10px] text-slate-400 truncate">{col.district}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
