"use client";

import React, { useState } from "react";
import faqsData from "@/data/faqs.json";
import { FAQItem } from "@/types";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { HelpCircle, Search } from "lucide-react";

export default function FaqSection() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "General",
    "Application Process",
    "VTU Guidelines",
    "Certificates",
    "Stipend & Offers",
  ];

  const filteredFaqs = (faqsData as FAQItem[]).filter((item) => {
    const matchesCat = selectedCat === "All" || item.category === selectedCat;
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faqs" className="py-20 bg-brand-slate">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Everything you need to know about VTU credit validation, stipends, and application steps.
          </p>

          {/* Quick Search */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions (e.g. NOC, credits, stipend)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-soft"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCat === cat
                    ? "bg-brand-blue text-white shadow-soft"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <Accordion className="space-y-3">
          {filteredFaqs.slice(0, 10).map((faq, idx) => (
            <AccordionItem
              key={faq.id}
              title={faq.question}
              badge={faq.category}
              defaultOpen={idx === 0}
            >
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length > 10 && (
          <p className="text-center text-xs text-slate-400 mt-6">
            Showing top 10 results out of {filteredFaqs.length} FAQs. Use the search bar above to narrow down.
          </p>
        )}
      </div>
    </section>
  );
}
