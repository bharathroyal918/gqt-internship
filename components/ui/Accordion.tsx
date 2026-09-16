"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  badge?: string;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
  badge,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-200",
        isOpen ? "shadow-soft border-blue-200" : "hover:border-slate-300",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 pr-4">
          <span className="text-base font-semibold text-slate-900">{title}</span>
          {badge && (
            <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-brand-blue font-medium rounded-full border border-blue-100">
              {badge}
            </span>
          )}
        </div>
        <div
          className={cn(
            "p-1.5 rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 flex-shrink-0",
            isOpen && "transform rotate-180 bg-blue-50 text-brand-blue"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 leading-relaxed animate-fade-up">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}
