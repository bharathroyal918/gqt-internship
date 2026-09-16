"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dropzone } from "@/components/ui/Dropzone";
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Github,
  Linkedin,
  Globe,
  Award,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: "Rohan M. Patil",
    email: "rohan.patil@student.rvce.ac.in",
    phone: "+91 98451 23456",
    dob: "2004-05-14",
    gender: "Male",
    address: "BTM 2nd Stage, Bengaluru - 560076",
    college: "RV College of Engineering",
    usn: "1RV22CS089",
    degree: "Bachelor of Engineering (B.E.)",
    branch: "Computer Science & Engineering",
    cgpa: "8.65",
    batch: "2026",
    github: "https://github.com/rohanpatil",
    linkedin: "https://linkedin.com/in/rohanpatil",
    portfolio: "https://rohanpatil.dev",
  });

  const [skills, setSkills] = useState([
    "Java",
    "Spring Boot",
    "React 19",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS Core",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const [projects, setProjects] = useState([
    {
      id: "p1",
      title: "VTU Smart Campus Ledger",
      tech: "Next.js, FastAPI, PostgreSQL",
      desc: "Decentralized transcript validation system with QR verification adopted by 3 departments.",
    },
    {
      id: "p2",
      title: "Automated Microservices Health Orchestrator",
      tech: "Spring Boot, Kafka, Docker",
      desc: "Real-time anomaly detector and alerting framework with Slack webhooks.",
    },
  ]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      toast.success("Skill added!");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile Updated Successfully!", {
      description: "Recruiters and college guides will see your updated information.",
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Banner with Completion Progress */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy text-white font-extrabold text-xl flex items-center justify-center shadow-soft">
            RP
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{profile.name}</h1>
            <p className="text-xs text-slate-500">
              {profile.branch} • {profile.college} (USN: {profile.usn})
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                VTU Verified Student
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue font-bold">
                Batch {profile.batch}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600">Profile Completion</span>
            <span className="text-emerald-700 font-bold">85%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[85%]" />
          </div>
          <span className="text-[10px] text-slate-400 block">
            Add 1 more project to hit 100% verified status
          </span>
        </div>
      </div>

      {/* Section 1: Personal Details */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="h-4 w-4 text-brand-blue" />
          <span>Personal Information</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Legal Name
            </label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institutional Email
            </label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number (WhatsApp)
            </label>
            <Input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Residential Address (Karnataka)
            </label>
            <Input
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Birth
            </label>
            <Input
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Education & Academic Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <GraduationCap className="h-4 w-4 text-brand-blue" />
          <span>Academic Background (VTU Aligned)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Engineering College
            </label>
            <Input
              value={profile.college}
              onChange={(e) => setProfile({ ...profile, college: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              University Seat Number (USN)
            </label>
            <Input
              value={profile.usn}
              onChange={(e) => setProfile({ ...profile, usn: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Degree & Program
            </label>
            <Input
              value={profile.degree}
              onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Specialization / Branch
            </label>
            <Input
              value={profile.branch}
              onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cumulative GPA (CGPA)
            </label>
            <Input
              value={profile.cgpa}
              onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Graduation Passing Batch
            </label>
            <Input
              value={profile.batch}
              onChange={(e) => setProfile({ ...profile, batch: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Technical Skills */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <Award className="h-4 w-4 text-brand-blue" />
          <span>Technical Skills & Proficiencies</span>
        </h2>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200/70"
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

        <div className="flex gap-2 max-w-sm pt-2">
          <Input
            placeholder="Add new skill (e.g. PyTorch, Kubernetes)..."
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

      {/* Section 4: Resume Dropzone */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileText className="h-4 w-4 text-brand-blue" />
          <span>Resume & Professional Documents</span>
        </h2>
        <Dropzone
          label="Upload updated CV / Resume"
          hint="PDF or Word format, max 5MB"
          onFileAccepted={() => toast.success("Resume updated ready for save")}
        />
      </div>

      {/* Section 5: Online Links & Projects */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="h-4 w-4 text-brand-blue" />
          <span>Online Portfolios & Code Links</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              GitHub URL
            </label>
            <Input
              icon={<Github className="h-4 w-4" />}
              value={profile.github}
              onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              LinkedIn URL
            </label>
            <Input
              icon={<Linkedin className="h-4 w-4" />}
              value={profile.linkedin}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Portfolio / Website URL
            </label>
            <Input
              icon={<Globe className="h-4 w-4" />}
              value={profile.portfolio}
              onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
            />
          </div>
        </div>

        {/* Projects list */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase">
            Highlighted Academic Projects
          </h3>
          <div className="space-y-2.5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-mono font-medium">
                    {p.tech}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" variant="primary" size="lg" className="rounded-xl shadow-soft font-bold">
          Save All Changes
        </Button>
      </div>
    </form>
  );
}
