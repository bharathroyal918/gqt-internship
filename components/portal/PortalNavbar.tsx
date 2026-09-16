"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  Building2,
  Info,
  PhoneCall,
  LayoutDashboard,
  LogIn,
  Menu,
  X,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PortalNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Internships", href: "/internships", badge: "100+" },
    { name: "Companies", href: "/companies" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 w-full",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-200/80 py-3"
          : "bg-white border-b border-slate-100 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-brand-navy tracking-tight group-hover:text-brand-blue transition-colors">
                  GLOBAL QUEST
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-brand-blue font-bold border border-blue-200">
                  PORTAL
                </span>
              </div>
              <span className="text-[11px] text-slate-500 tracking-wide font-medium flex items-center gap-1">
                <span>VTU Internship Network</span>
                <span className="h-1 w-1 rounded-full bg-amber-400"></span>
                <span className="text-slate-400">Karnataka</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/60" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-1.5",
                    isActive
                      ? "bg-white text-brand-blue font-semibold shadow-sm"
                      : "text-slate-600 hover:text-brand-blue hover:bg-white/60"
                  )}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-brand-blue font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Go to Student Dashboard */}
            <Link
              href="/dashboard"
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-1.5",
                pathname.startsWith("/dashboard")
                  ? "bg-brand-navy text-white font-semibold shadow-sm"
                  : "text-slate-700 hover:text-brand-navy hover:bg-white/60"
              )}
            >
              <LayoutDashboard className="h-4 w-4 text-amber-500" />
              <span>Go to Dashboard</span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login">
              <Button variant="primary" size="md" className="rounded-xl shadow-soft">
                <LogIn className="h-4 w-4" />
                <span>Student Login</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fade-up shadow-soft-lg">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium",
                    isActive
                      ? "bg-blue-50 text-brand-blue font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-brand-blue font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold bg-slate-50 text-brand-navy"
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-amber-500" />
                <span>Go to Student Dashboard</span>
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                <LogIn className="h-4 w-4" />
                <span>Student / College Login</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
