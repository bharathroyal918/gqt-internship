"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dropzone } from "@/components/ui/Dropzone";
import { Internship } from "@/types";
import collegesData from "@/data/colleges.json";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { CheckCircle2, Building2, MapPin, DollarSign, Clock } from "lucide-react";

interface ApplyModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ApplyModal({
  internship,
  isOpen,
  onClose,
  onSuccess,
}: ApplyModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "Bharath Royal",
    usn: "23785A3102",
    email: "bharath.royal@student.rvs",
    phone: "+91 9182583234",
    college: "RVS University",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    cgpa: "9.05",
    github: "https://github.com/rohanpatil",
    linkedin: "https://linkedin.com/in/rohanpatil",
    hasNocApproval: true,
  });

  if (!internship) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback
      }

      toast.success("Application Submitted Successfully!", {
        description: `Your profile and resume were forwarded to ${internship.company}.`,
      });

      onSuccess?.();
    }, 1200);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={submitted ? "Application Confirmed" : `Apply to ${internship.company}`}
      description={
        submitted
          ? "Your application is currently active under recruiter review."
          : `GQT Curriculum Internship Application for ${internship.title}`
      }
      maxWidth="2xl"
    >
      {submitted ? (
        <div className="py-6 text-center space-y-4 animate-fade-up">
          <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Application Received!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Congratulations <strong>{formData.name}</strong>! Your application for{" "}
            <strong>{internship.title}</strong> has been logged with Reference ID{" "}
            <span className="font-mono font-bold text-brand-blue">
              GQT-APP-{Math.floor(100000 + Math.random() * 900000)}
            </span>
            .
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Target Role:</span>
              <span className="font-semibold text-slate-800">{internship.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Company:</span>
              <span className="font-semibold text-slate-800">{internship.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Stipend:</span>
              <span className="font-semibold text-emerald-700 font-mono">
                {internship.stipend}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Next Step:</span>
              <span className="font-medium text-amber-700">
                Placement Officer Verification
              </span>
            </div>
          </div>
          <div className="pt-4 flex justify-center gap-3">
            <Button variant="primary" onClick={handleResetAndClose}>
              Done & Return to Portal
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quick Internship Snapshot */}
          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-brand-blue">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{internship.title}</p>
                <p className="text-slate-500">{internship.company} • {internship.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {internship.location}
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <DollarSign className="h-3.5 w-3.5" />
                {internship.stipend}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {internship.duration}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name (As per College ID) *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                University Seat Number (USN) *
              </label>
              <Input
                required
                placeholder="e.g. 1RV22CS045"
                value={formData.usn}
                onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Institutional Email *
              </label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contact Number (WhatsApp) *
              </label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Affiliated College *
              </label>
              <Select
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              >
                {collegesData.map((col) => (
                  <option key={col.id} value={col.name}>
                    {col.name} ({col.shortCode})
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current CGPA *
              </label>
              <Input
                required
                placeholder="e.g. 8.5"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
              />
            </div>
          </div>

          {/* Resume Upload Dropzone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload Updated Resume (PDF or DOCX) *
            </label>
            <Dropzone label="Drag and drop your updated CV" hint="Max 5MB file" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                GitHub Profile URL
              </label>
              <Input
                placeholder="https://github.com/username"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                LinkedIn Profile URL
              </label>
              <Input
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>
          </div>

          {/* Declaration Checkbox */}
          <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <input
              type="checkbox"
              id="declaration"
              required
              defaultChecked={formData.hasNocApproval}
              className="mt-0.5 h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-slate-300"
            />
            <label htmlFor="declaration" className="text-xs text-slate-600 leading-relaxed">
              I certify that I am a bona fide student fulfilling VTU / college mandatory internship norms. I agree to attend scheduled interviews and log weekly task milestones if selected.
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading}>
              Submit Application
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
