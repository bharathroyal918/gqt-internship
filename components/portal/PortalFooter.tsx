import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ExternalLink,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Github,
} from "lucide-react";

export default function PortalFooter() {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Column 1: About GQT */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-xl shadow-soft inline-flex items-center flex-shrink-0">
                <Image
                  src="/images/gqt-logo.jpeg"
                  alt="GQT Logo"
                  width={110}
                  height={38}
                  className="h-9 w-auto object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-lg tracking-tight leading-tight">
                  GQT <span className="text-amber-400">Internship</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Official Portal
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global Quest Technologies is Karnataka’s premier industry immersion and technical training ecosystem, empowering engineering colleges and students with credit-aligned internships and career pathways.
            </p>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Industry Verified Partner</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Authorized for technical skill curriculum credits & digital certification.
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Youtube, href: "https://youtube.com" },
                { icon: Github, href: "https://github.com" },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-brand-blue text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Social Link"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue"></span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Search All Internships", href: "/internships" },
                { label: "Top Hiring Companies", href: "/companies" },
                { label: "AI & Data Science Cohorts", href: "/internships?category=AI+Internship" },
                { label: "Full Stack Java & MERN", href: "/internships?category=Java+Full+Stack" },
                { label: "Student Dashboard", href: "/dashboard" },
                { label: "About GQT Heritage", href: "/about" },
                { label: "Contact Grievance Cell", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Karnataka Offices</span>
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Incubation:</strong> #324,2nd Floor,3 A Cross, Near Seshadripuram First Grade College, Above City Union Bank, Yelahanka New Town, Bengaluru-560064.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Corporate:</strong> 8th Main Rd, Judicial Layout, Yelahanka, Bengaluru, Karnataka 560065
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>+91 94484 03469</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <span>internships@gqtech.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM – 6:30 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Global Quest Technologies (GQT). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Grievance Redressal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
