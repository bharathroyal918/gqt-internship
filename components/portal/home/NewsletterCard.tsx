"use client";

import React, { useState } from "react";
import { Mail, Bell, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    toast.success("Subscribed to GQT Internship Alerts!", {
      description: `Daily alerts for new Karnataka openings will be sent to ${email}.`,
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-navy via-brand-navy-light to-blue-900 p-8 sm:p-12 lg:p-16 text-white shadow-soft-xl border border-white/10">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-brand-blue/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Never Miss a High-Stipend Opening</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Get Instant WhatsApp & Email Alerts for Relevant Internships
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Receive curated notifications matching your degree branch, college location, and target tech stack. 100% free for VTU engineering students.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center justify-center gap-3 text-emerald-200 text-sm font-semibold animate-fade-up">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>You are subscribed! Check your inbox for confirmation.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your college or personal email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/15"
                  />
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="rounded-xl shadow-soft font-bold"
                >
                  <Bell className="h-4 w-4" />
                  <span>Subscribe Alerts</span>
                </Button>
              </form>
            )}

            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2">
              <span>✓ Zero Spam Policy</span>
              <span>✓ Unsubscribe Anytime</span>
              <span>✓ Weekly Digest Option</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
