"use client";

import React, { useState } from "react";
import Link from "next/link";
import internshipsData from "@/data/internships.json";
import { Internship } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ApplyModal from "@/components/common/ApplyModal";
import {
  Bookmark,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

export default function SavedInternshipsPage() {
  const [savedList, setSavedList] = useState<Internship[]>(
    (internshipsData as Internship[]).slice(1, 4)
  );
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const handleRemove = (id: string, title: string) => {
    setSavedList(savedList.filter((i) => i.id !== id));
    toast.info("Removed from saved list", {
      description: title,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Saved Internships ({savedList.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bookmarked opportunities for quick reference and single-click application.
          </p>
        </div>
        <Link href="/internships">
          <Button variant="outline" size="sm" className="rounded-xl">
            <span>Browse More Roles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {savedList.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-soft">
          <Bookmark className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Saved Internships</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click the bookmark icon on any internship listing to save it here for later.
          </p>
          <Link href="/internships" className="inline-block mt-4">
            <Button variant="primary" size="sm" className="rounded-xl">
              Find Internships
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 border border-slate-200 flex items-center justify-center font-bold text-brand-blue text-xs">
                      {item.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {item.company}
                      </span>
                      <Link href={`/internships/${item.id}`}>
                        <h3 className="text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stipend:</span>
                    <span className="font-bold text-emerald-700 font-mono">
                      {item.stipend}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="truncate max-w-[150px]">{item.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mode:</span>
                    <span className="font-medium text-brand-blue">{item.mode}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/internships/${item.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-brand-blue"
                >
                  View Details
                </Link>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setSelectedInternship(item)}
                  className="text-xs h-8 px-4 rounded-lg"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Apply Modal */}
      {selectedInternship && (
        <ApplyModal
          internship={selectedInternship}
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </div>
  );
}
