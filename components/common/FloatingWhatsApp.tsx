"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(message || "Hello GQT Internship Team, I need assistance with my VTU internship application.");
    window.open(`https://wa.me/919845012345?text=${encoded}`, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="w-80 bg-white rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden animate-fade-up mb-2">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">GQT Student Support</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 inline-block"></span>
                    Typically replies within 10 mins
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                aria-label="Close WhatsApp chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 space-y-3 text-xs">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200/60 max-w-[85%] text-slate-700 leading-relaxed">
                👋 Hello student! Welcome to Global Quest Technologies. How can our internship counseling team assist you today?
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["VTU NOC Query", "Stipend Details", "Interview Status", "College Placement Officer"].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setMessage(`Hi, I have a question regarding ${quick}.`)}
                    className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors text-[11px]"
                  >
                    {quick}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="Send WhatsApp message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-soft-lg hover:shadow-soft-xl hover:scale-105 transition-all duration-200 group relative"
          aria-label="Open WhatsApp chat support"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] font-bold text-white items-center justify-center">
              1
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
