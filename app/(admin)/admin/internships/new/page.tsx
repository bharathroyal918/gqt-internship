"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dropzone } from "@/components/ui/Dropzone";
import companiesData from "@/data/companies.json";
import categoriesData from "@/data/categories.json";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Eye,
  Save,
  Send,
  Plus,
  Trash2,
  Award,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";

export default function NewInternshipPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(companiesData[0].name);
  const [category, setCategory] = useState(categoriesData[0].name);
  const [mode, setMode] = useState("Hybrid");
  const [location, setLocation] = useState("Bengaluru, Karnataka");
  const [stipend, setStipend] = useState("25000");
  const [duration, setDuration] = useState("4 Months");
  const [vacancies, setVacancies] = useState("10");
  const [deadline, setDeadline] = useState("2026-10-15");
  const [eligibility, setEligibility] = useState(
    "BE / B.Tech / MCA students of 6th, 7th & 8th Semesters with minimum 6.5 CGPA. VTU NOC eligible."
  );
  const [description, setDescription] = useState(
    "Selected candidate will collaborate directly with senior engineers to architect microservices, conduct daily agile standups, and deploy production pipelines for enterprise clients."
  );
  const [skills, setSkills] = useState(["Java", "Spring Boot", "Docker", "REST APIs"]);
  const [newSkill, setNewSkill] = useState("");
  const [certificateIncluded, setCertificateIncluded] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = (publish: boolean) => {
    if (!title.trim()) {
      toast.error("Please enter an internship title");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        publish ? "Internship Published Successfully!" : "Internship Draft Saved!",
        {
          description: `${title} is now recorded in the GQT database.`,
        }
      );
      router.push("/admin/internships");
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/internships"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-blue mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Internship Directory</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create New Internship Listing
          </h1>
          <p className="text-xs text-slate-500">
            VTU Accreditation schema compliant internship publishing engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-xl"
          >
            <Eye className="h-4 w-4 mr-1" />
            <span>{showPreview ? "Hide Preview" : "Live Preview"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSave(false)}
            isLoading={isSubmitting}
            className="rounded-xl text-xs"
          >
            <Save className="h-4 w-4 mr-1" />
            <span>Save Draft</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSave(true)}
            isLoading={isSubmitting}
            className="rounded-xl font-bold text-xs"
          >
            <Send className="h-4 w-4 mr-1" />
            <span>Publish Now</span>
          </Button>
        </div>
      </div>

      {/* Live Preview Bar if active */}
      {showPreview && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 animate-fade-up space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              Student View Preview
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">
              ₹{Number(stipend || 0).toLocaleString("en-IN")} / month
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {title || "Untitled Internship Role"}
          </h3>
          <p className="text-xs text-slate-600">
            {company} • {category} • {mode} ({location}) • {duration}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 font-semibold border border-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Form Cards */}
      <div className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Role & Partner Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Internship Title *
              </label>
              <Input
                required
                placeholder="e.g. Generative AI Engineer Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hiring Company *
              </label>
              <Select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                {companiesData.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.domain})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Technical Category / Domain *
              </label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoriesData.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Engagement Mode *
              </label>
              <Select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="Remote">100% Remote / Virtual</option>
                <option value="Hybrid">Hybrid (Bangalore Campus)</option>
                <option value="On-site">On-site Corporate Office</option>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location Details
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Electronic City, Bangalore"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Compensation & Academic Terms */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Compensation, Timeline & Quota
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Monthly Stipend (INR) *
              </label>
              <Input
                type="number"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                placeholder="25000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Internship Duration *
              </label>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="2 Months">2 Months (Summer)</option>
                <option value="3 Months">3 Months (Curriculum)</option>
                <option value="4 Months">4 Months (Full Semester)</option>
                <option value="6 Months">6 Months (Pre-Placement)</option>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vacancies / Openings
              </label>
              <Input
                type="number"
                value={vacancies}
                onChange={(e) => setVacancies(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Application Deadline
              </label>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Skills & Description */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Required Technical Stack & Description
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Required Skills (Tags)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-brand-blue rounded-xl text-xs font-semibold border border-blue-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 max-w-sm">
              <Input
                placeholder="Type skill & click Add..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddSkill}
                className="rounded-xl px-4"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Eligibility Criteria
            </label>
            <Input
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Role Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* Section 4: Banner & Digital Certificate Issuance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Media & Certification
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Role Banner Image
              </label>
              <Dropzone
                label="Drop custom internship banner"
                hint="PNG or JPG up to 5MB"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Company Brand Logo
              </label>
              <Dropzone
                label="Drop company logo SVG or PNG"
                hint="Transparent background recommended"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Automatic VTU Digital Certificate Issuance
              </span>
              <span className="text-[11px] text-slate-500">
                Generates verifiable cryptographic QR certificate upon milestone signoff by college guide.
              </span>
            </div>
            <input
              type="checkbox"
              checked={certificateIncluded}
              onChange={(e) => setCertificateIncluded(e.target.checked)}
              className="h-4 w-4 rounded text-brand-blue"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/admin/internships">
            <Button variant="ghost" size="md" className="rounded-xl">
              Cancel
            </Button>
          </Link>
          <Button
            variant="outline"
            size="md"
            onClick={() => handleSave(false)}
            isLoading={isSubmitting}
            className="rounded-xl"
          >
            Save as Draft
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => handleSave(true)}
            isLoading={isSubmitting}
            className="rounded-xl font-bold shadow-soft"
          >
            Publish to Portal
          </Button>
        </div>
      </div>
    </div>
  );
}
