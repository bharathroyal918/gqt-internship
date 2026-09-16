"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [currentTab, setCurrentTab] = useState(defaultValue || "");
  const activeTab = value !== undefined ? value : currentTab;

  const handleTabChange = (val: string) => {
    if (value === undefined) setCurrentTab(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-1 bg-slate-100 rounded-xl gap-1 border border-slate-200/80",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  badge,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  badge?: string | number;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 gap-2",
        isActive
          ? "bg-white text-brand-blue font-semibold shadow-sm"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60",
        className
      )}
    >
      <span>{children}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-bold",
            isActive ? "bg-blue-100 text-brand-blue" : "bg-slate-200 text-slate-600"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be within Tabs");

  if (context.activeTab !== value) return null;

  return <div className={cn("mt-4 animate-fade-up", className)}>{children}</div>;
}
