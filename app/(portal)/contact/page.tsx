"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    usn: "",
    college: "",
    subject: "Internship Query",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message Dispatched Successfully!", {
        description: "Our student grievance & counseling cell will respond within 24 hours.",
      });
    }, 1000);
  };

  return (
    <div className="bg-brand-slate min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Karnataka Student Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            We’re Here to Help You Navigate Your Internship
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
            Have questions regarding VTU curriculum credits, offer letter verification, or college guide signatures? Get in touch with our counseling officers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the query form below. Average response time: under 4 business hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4 animate-fade-up">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">
                  Thank you, {formData.name}!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your ticket has been logged with Reference ID{" "}
                  <span className="font-mono font-bold text-emerald-700">
                    GQT-TKT-{Math.floor(10000 + Math.random() * 90000)}
                  </span>
                  . A counselor will call or email you shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-2"
                >
                  Submit Another Query
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Rohan M. Patil"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Institutional Email *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="e.g. rohan@student.rvce.ac.in"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <Input
                      required
                      placeholder="+91 98450 12345"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      University Seat Number (USN)
                    </label>
                    <Input
                      placeholder="e.g. 1RV22CS045"
                      value={formData.usn}
                      onChange={(e) =>
                        setFormData({ ...formData, usn: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Engineering College
                    </label>
                    <Input
                      placeholder="e.g. BMSCE, MSRIT, NIE..."
                      value={formData.college}
                      onChange={(e) =>
                        setFormData({ ...formData, college: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject / Query Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full h-11 px-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                      <option value="Internship Query">Internship Opportunity Query</option>
                      <option value="VTU Credit Validation">VTU Credit Validation</option>
                      <option value="College NOC Support">College NOC Support</option>
                      <option value="Certificate Verification">Certificate Verification</option>
                      <option value="Corporate Placement Cell">Corporate Placement Cell</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry or college requirement in detail..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  className="rounded-xl shadow-soft font-bold"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>

          {/* Contact Details & Addresses (1 col) */}
          <div className="space-y-6">
            {/* Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="h-4 w-4 text-brand-blue" />
                <span>Bengaluru Headquarters</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <p className="flex items-start gap-2 leading-relaxed">
                  <MapPin className="h-4 w-4 text-brand-blue flex-shrink-0 mt-0.5" />
                  <span>#42, Global Quest Tower, Sector 3, HSR Layout, Bengaluru, Karnataka - 560102</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>+91 080 4920 7800</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span>internships@gqtech.in</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span>Monday - Saturday: 9:00 AM - 6:30 PM</span>
                </p>
              </div>
            </div>

            {/* Regional Centers Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Regional Hubs
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="font-bold text-slate-800 block">Mysuru Office:</span>
                  <p className="text-slate-500">2nd Floor, Software Technology Parks of India (STPI), Hebbal Industrial Area, Mysuru - 570016</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="font-bold text-slate-800 block">Hubballi - Dharwad Hub:</span>
                  <p className="text-slate-500">KLE Tech University Incubation Center, Vidyanagar, Hubballi - 580031</p>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Office Location Map
              </h3>
              <div className="h-44 rounded-2xl bg-slate-100 border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
                <MapPin className="h-8 w-8 text-rose-500 animate-bounce mb-2" />
                <span className="font-bold text-xs text-slate-800">
                  Global Quest Technologies Tower
                </span>
                <span className="text-[11px] text-slate-500">
                  HSR Layout, Bengaluru (Near Silk Board)
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 text-xs font-semibold text-brand-blue hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
