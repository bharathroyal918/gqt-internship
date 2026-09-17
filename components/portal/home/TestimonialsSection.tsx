"use client";

import React, { useState } from "react";
import testimonialsData from "@/data/testimonials.json";
import { Testimonial } from "@/types";
import { Star, Play, Quote, GraduationCap, Building2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export default function TestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);
  const testimonials = (testimonialsData as Testimonial[]).slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
            <span>Student Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hear From Our 2026 Batch Interns
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Real stories from engineering students who transformed their technical skills into full-time career offers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: User Avatar + Video Button or Stars */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="h-12 w-12 rounded-full object-cover border-2 border-brand-blue"
                      />
                      {t.videoBadge && (
                        <button
                          onClick={() => setActiveVideo(t)}
                          className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                          title="Watch Video Review"
                          aria-label={`Watch video testimonial by ${t.name}`}
                        >
                          <Play className="h-2.5 w-2.5 fill-white" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <GraduationCap className="h-3 w-3 text-brand-blue" />
                        <span>{t.college}</span>
                      </p>
                    </div>
                  </div>

                  {/* 5-star rating */}
                  <div className="flex items-center text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Role and Stipend Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue font-semibold border border-blue-100">
                    {t.role}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">
                    {t.stipend}
                  </span>
                </div>

                {/* Feedback Quote */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;{t.feedback}&rdquo;
                </p>
              </div>

              {/* Card Footer: Company */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  Hired at: <strong className="text-slate-700">{t.company}</strong>
                </span>

                {t.videoBadge && (
                  <button
                    onClick={() => setActiveVideo(t)}
                    className="text-brand-blue font-semibold text-[11px] hover:underline flex items-center gap-1"
                  >
                    <span>Watch Clip</span>
                    <Play className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Simulator */}
      {activeVideo && (
        <Modal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={`Video Testimonial: ${activeVideo.name}`}
          description={`${activeVideo.role} at ${activeVideo.company} (${activeVideo.college})`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden relative flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeVideo.photo}
                alt={activeVideo.name}
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
              />
              <div className="relative z-10 text-center text-white space-y-3 p-6">
                <div className="h-16 w-16 rounded-full bg-brand-blue/80 backdrop-blur-md flex items-center justify-center mx-auto shadow-soft-xl cursor-pointer hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 fill-white ml-1" />
                </div>
                <h4 className="text-lg font-bold">
                  &ldquo;How GQT Helped Me Clear Tech Interviews at {activeVideo.company}&rdquo;
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Recorded live during the 2026 National Placement Conclave.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong>Candidate Summary:</strong> {activeVideo.feedback}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
