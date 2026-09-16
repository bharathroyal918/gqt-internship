"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import circularsData from "@/data/circulars.json";
import { Circular, CircularCategory } from "@/types";
import {
  BellRing,
  Calendar,
  FileText,
  ExternalLink,
  ChevronRight,
  Pin,
  Building,
} from "lucide-react";

export default function CircularBoard() {
  const [selectedCircular, setSelectedCircular] = useState<Circular | null>(null);

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "danger";
      case "High":
        return "warning";
      default:
        return "default";
    }
  };

  const categories: CircularCategory[] = ["Latest", "Placement", "Exam", "Training"];

  return (
    <section id="circulars" className="pt-36 pb-16 bg-brand-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
              <BellRing className="h-3.5 w-3.5" />
              <span>Official Circulars & Notice Board</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              University Notifications & Guidelines
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Stay informed with real-time academic circulars, internship drive schedules, and viva norms.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Updated Daily from VTU Registrar Cell
            </span>
          </div>
        </div>

        {/* Circular Card Container */}
        <div className="bg-white rounded-2xl shadow-soft border border-slate-200/80 p-6 lg:p-8">
          <Tabs defaultValue="Latest">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
              <TabsList className="bg-slate-100 p-1 rounded-xl">
                {categories.map((cat) => {
                  const count = circularsData.filter(
                    (c) => cat === "Latest" || c.category === cat
                  ).length;
                  return (
                    <TabsTrigger key={cat} value={cat} badge={count}>
                      {cat}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-brand-blue hover:text-brand-blue-hover self-start sm:self-auto"
                onClick={() => setSelectedCircular(circularsData[0] as Circular)}
              >
                <span>Read Latest Guideline</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            {categories.map((cat) => {
              const filtered = circularsData.filter(
                (c) => cat === "Latest" || c.category === cat
              );

              return (
                <TabsContent key={cat} value={cat} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.slice(0, 6).map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCircular(c as Circular)}
                        className="group p-4 rounded-xl border border-slate-200/80 hover:border-brand-blue/60 bg-white hover:bg-blue-50/20 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {c.pinned && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                  <Pin className="h-3 w-3" /> Pinned
                                </span>
                              )}
                              <Badge variant={getPriorityBadgeVariant(c.priority)}>
                                {c.priority} Priority
                              </Badge>
                            </div>
                            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {c.date}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                            {c.title}
                          </h3>

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {c.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-mono text-slate-400">
                            Ref: {c.refNo}
                          </span>
                          <span className="text-brand-blue font-semibold group-hover:underline flex items-center gap-1">
                            View Notice <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>

      {/* Circular Details Modal */}
      {selectedCircular && (
        <Modal
          isOpen={!!selectedCircular}
          onClose={() => setSelectedCircular(null)}
          title={selectedCircular.title}
          description={`Ref No: ${selectedCircular.refNo} • Published on ${selectedCircular.date}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-brand-blue" />
                <span>
                  Issued By: <strong>{selectedCircular.department || "Academic Directorate"}</strong>
                </span>
              </div>
              <Badge variant={getPriorityBadgeVariant(selectedCircular.priority)}>
                {selectedCircular.priority}
              </Badge>
            </div>

            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs leading-relaxed">
              <strong>Summary:</strong> {selectedCircular.excerpt}
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-slate-900">Official Directive</h4>
              <p className="leading-relaxed whitespace-pre-line text-slate-600">
                {selectedCircular.content}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCircular(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`Downloading official signed circular: ${selectedCircular.refNo}.pdf`);
                }}
              >
                <FileText className="h-4 w-4" />
                <span>Download Official PDF</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
