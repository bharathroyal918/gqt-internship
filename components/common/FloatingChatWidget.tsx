"use client";

import React, { useState } from "react";
import { Bot, X, Send, Sparkles, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  link?: { href: string; label: string };
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaskara! I am the GQT Internship Assistant. Ask me about VTU credits, application tracking, highest paying stipends, or how to get your NOC verified.",
    },
  ]);

  const quickPrompts = [
    {
      q: "Are these internships approved by VTU?",
      a: "Yes! All 100+ internships on the GQT Portal strictly follow the VTU 2022/2026 scheme curriculum credits and AICTE norms. Your college guide can verify through the college code.",
      link: { href: "/about", label: "Read VTU Affiliation" },
    },
    {
      q: "Which roles offer stipend > ₹25,000?",
      a: "Companies like Cisco, PhonePe, Razorpay, and Infosys Labs offer stipends between ₹28,000 and ₹37,000/month for AI, Java Full Stack, and Cloud Security roles.",
      link: { href: "/internships", label: "Explore High Stipend Internships" },
    },
    {
      q: "How to download college NOC?",
      a: "Once shortlisted or selected, visit your Student Dashboard > My Applications > View Offer to download your pre-filled, signed university NOC form.",
      link: { href: "/dashboard/applications", label: "Open Applications Tracker" },
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");

    // Simulate AI bot intelligent reply
    setTimeout(() => {
      let botReply =
        "Thank you for your question. You can explore active opportunities in the Internships section, or reach out to our placement support helpline.";
      let botLink: { href: string; label: string } | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes("vtu") || lower.includes("credit") || lower.includes("scheme")) {
        botReply =
          "All internships listed here fulfill VTU 8th & 6th-semester mandatory credits. You will receive digital certificates with verification hashes accepted across Karnataka universities.";
        botLink = { href: "/about", label: "Learn More" };
      } else if (lower.includes("stipend") || lower.includes("pay") || lower.includes("salary")) {
        botReply =
          "Over 85% of listings are paid with monthly stipends ranging from ₹10,000 up to ₹40,000. Filter by stipend on the internships page!";
        botLink = { href: "/internships", label: "View Paid Internships" };
      } else if (lower.includes("apply") || lower.includes("register") || lower.includes("process")) {
        botReply =
          "Applying takes under 60 seconds! Simply browse an internship, click 'Apply Now', upload your resume, and track status on your Student Dashboard.";
        botLink = { href: "/internships", label: "Browse Roles" };
      } else if (lower.includes("noc") || lower.includes("letter") || lower.includes("college")) {
        botReply =
          "NOC and Offer Letters are auto-generated in your Student Dashboard under 'My Applications' after recruiter shortlisting.";
        botLink = { href: "/dashboard/applications", label: "Go to Dashboard" };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botReply,
          link: botLink,
        },
      ]);
    }, 500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-24 z-40">
        {isOpen && (
          <div className="w-88 sm:w-96 bg-white rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden animate-fade-up mb-2 flex flex-col h-[480px]">
            {/* Header */}
            <div className="bg-brand-navy text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-soft">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-1.5">
                    <span>GQT AI Advisor</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-gold text-slate-900 font-bold">
                      PRO
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    VTU Internship & Career Guide
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.sender === "bot" && (
                    <div className="h-7 w-7 rounded-lg bg-brand-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      m.sender === "user"
                        ? "bg-brand-blue text-white rounded-tr-none shadow-sm"
                        : "bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-soft"
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.link && (
                      <Link
                        href={m.link.href}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-blue hover:underline"
                      >
                        <span>{m.link.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                  {m.sender === "user" && (
                    <div className="h-7 w-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Prompts */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Suggested Questions
                </p>
                <div className="space-y-1.5">
                  {quickPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.q)}
                      className="w-full text-left p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-brand-blue transition-colors text-[11px]"
                    >
                      💡 {p.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about GQT internships..."
                className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <Button type="submit" size="sm" className="rounded-xl px-3.5">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-2xl bg-brand-navy hover:bg-brand-navy-light text-white flex items-center justify-center shadow-soft-lg hover:shadow-soft-xl hover:scale-105 transition-all duration-200 group"
          aria-label="Open AI chat assistant"
        >
          <Bot className="h-7 w-7 text-amber-400 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </>
  );
}
