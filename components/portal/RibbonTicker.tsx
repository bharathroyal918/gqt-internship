"use client";

import React from "react";
import Link from "next/link";
import { Megaphone, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import circularsData from "@/data/circulars.json";

export default function RibbonTicker() {
  const tickerItems = circularsData.filter((c) => c.showInTicker);

  return (
    <div className="bg-brand-navy text-white text-xs py-2 border-b border-white/10 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Fixed Announcement Tag */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-brand-blue text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
          <Megaphone className="h-3 w-3 animate-pulse" />
          <span>Announcements</span>
        </div>

        {/* Scrolling Marquee Container */}
        <div className="flex-1 overflow-hidden relative marquee-container cursor-pointer">
          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee marquee-content">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href="/#circulars"
                className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors group"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-amber-300 text-[11px]">
                  [{item.refNo}]
                </span>
                <span className="text-slate-100 group-hover:underline">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ({item.date})
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Action */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0 text-[11px] text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
            100+ Live Openings
          </span>
          <span className="text-slate-600">|</span>
          <Link
            href="/#circulars"
            className="hover:text-white flex items-center gap-1 text-slate-300 transition-colors"
          >
            <span>All Circulars</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
