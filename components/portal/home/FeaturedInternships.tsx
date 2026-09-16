"use client";

import React, { useState } from "react";
import Link from "next/link";
import internshipsData from "@/data/internships.json";
import { Internship } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ApplyModal from "@/components/common/ApplyModal";
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Bookmark,
  Share2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

export default function FeaturedInternships() {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(["gqt-int-001", "gqt-int-004"]);

  const featured = (internshipsData as Internship[])
    .filter((i) => i.featured)
    .slice(0, 6);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
      toast.info("Internship removed from saved list");
    } else {
      setSavedIds([...savedIds, id]);
      toast.success("Internship saved to your wishlist!", {
        description: "You can quickly apply from your Student Dashboard.",
      });
    }
  };

  const handleShare = (internship: Internship, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/internships/${internship.id}`);
    toast.success("Share link copied to clipboard!", {
      description: `${internship.title} at ${internship.company}`,
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Handpicked Opportunities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Corporate Internships
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Top rated by students and guaranteed curriculum compliant by VTU guidelines.
            </p>
          </div>

          <Link href="/internships">
            <Button variant="outline" size="md" className="rounded-xl">
              <span>View All 100+ Internships</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((internship) => {
            const isSaved = savedIds.includes(internship.id);

            return (
              <div
                key={internship.id}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  {/* Top Bar: Company logo + Save & Share */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-slate-200/80 overflow-hidden flex items-center justify-center font-bold text-brand-blue text-sm">
                        {internship.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {internship.company}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge variant="default" className="text-[10px] px-2 py-0">
                            {internship.category}
                          </Badge>
                          <Badge variant="navy" className="text-[10px] px-2 py-0">
                            {internship.mode}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleShare(internship, e)}
                        className="p-2 rounded-xl text-slate-400 hover:text-brand-blue hover:bg-slate-100 transition-colors"
                        title="Share Internship"
                        aria-label="Share Internship"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => toggleSave(internship.id, e)}
                        className={`p-2 rounded-xl transition-colors ${
                          isSaved
                            ? "text-amber-500 bg-amber-50"
                            : "text-slate-400 hover:text-amber-500 hover:bg-slate-100"
                        }`}
                        title={isSaved ? "Saved" : "Save to Wishlist"}
                        aria-label="Save Internship"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${isSaved ? "fill-amber-500" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={`/internships/${internship.id}`}>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {internship.title}
                    </h3>
                  </Link>

                  {/* Key Details Pill */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        Location:
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                        {internship.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                        Stipend:
                      </span>
                      <span className="font-bold text-emerald-700 font-mono">
                        {internship.stipend}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        Duration:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {internship.duration}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {internship.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {internship.skills.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-lg bg-slate-100 text-slate-400">
                        +{internship.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/internships/${internship.id}`}
                    className="text-xs font-semibold text-slate-600 hover:text-brand-blue"
                  >
                    View Details
                  </Link>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setSelectedInternship(internship)}
                    className="rounded-xl shadow-sm"
                  >
                    <span>Apply Now</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reusable Apply Modal */}
      {selectedInternship && (
        <ApplyModal
          internship={selectedInternship}
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </section>
  );
}
