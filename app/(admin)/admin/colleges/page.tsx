"use client";

import React, { useState } from "react";
import collegesData from "@/data/colleges.json";
import { College } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  GraduationCap,
  Search,
  Plus,
  Mail,
  Phone,
  Building,
  MapPin,
  Users,
  Briefcase,
  ShieldCheck,
  Award,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<College[]>(collegesData as College[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New College State
  const [newCol, setNewCol] = useState({
    name: "",
    shortCode: "",
    district: "Bangalore Urban",
    university: "VTU / Autonomous",
    placementOfficer: "",
    officerEmail: "",
    officerPhone: "",
    accreditation: "NAAC A+ / NBA Accredited",
    established: 2000,
    activeStudents: 1500,
  });

  const districts = Array.from(new Set(colleges.map((c) => c.district)));

  const filtered = colleges.filter((c) => {
    const matchesDistrict =
      districtFilter === "all" || c.district === districtFilter;
    const matchesSearch =
      !searchTerm ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: College = {
      id: `col-${Date.now()}`,
      name: newCol.name,
      shortCode: newCol.shortCode.toUpperCase(),
      district: newCol.district,
      state: "Karnataka",
      university: newCol.university,
      placementOfficer: newCol.placementOfficer,
      officerEmail: newCol.officerEmail,
      officerPhone: newCol.officerPhone,
      accreditation: newCol.accreditation,
      established: Number(newCol.established),
      activeStudents: Number(newCol.activeStudents),
      assignedInternships: 10,
      status: "Active",
    };

    setColleges([created, ...colleges]);
    setCreateModalOpen(false);
    toast.success("College Campus Onboarded!", {
      description: `${created.name} (${created.shortCode}) added to GQT Network.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Partner Engineering Colleges ({colleges.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Directory of VTU affiliated colleges, placement directors, and student quotas.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setCreateModalOpen(true)}
          className="rounded-xl font-bold"
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>Onboard College</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search college name or short code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400">District:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue cursor-pointer"
          >
            <option value="all">All Karnataka Districts</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((col) => (
          <div
            key={col.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft flex flex-col justify-between hover:shadow-card-hover transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 border border-slate-200 flex items-center justify-center font-extrabold text-brand-blue text-sm">
                    {col.shortCode}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {col.name}
                    </h3>
                    <p className="text-[11px] text-slate-500">{col.university}</p>
                  </div>
                </div>
                <Badge variant="success">{col.status}</Badge>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> District:
                  </span>
                  <span className="font-semibold text-slate-800">{col.district}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Award className="h-3 w-3" /> Accreditation:
                  </span>
                  <span className="font-medium text-emerald-700">
                    {col.accreditation.split(" / ")[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="h-3 w-3" /> Active Candidates:
                  </span>
                  <span className="font-mono font-bold text-brand-blue">
                    {col.activeStudents.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Placement Officer Info */}
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Placement Directorate
                </span>
                <p className="font-bold text-slate-800">{col.placementOfficer}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-400" />
                    {col.officerEmail}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">
                {col.assignedInternships} Cohorts Assigned
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-brand-blue h-7 px-2"
                onClick={() => toast.info(`Viewing roster for ${col.shortCode}`)}
              >
                View Roster →
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard College Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Onboard New Engineering College"
          description="Register university placement officer credentials on GQT Portal"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                College Full Name *
              </label>
              <Input
                required
                placeholder="e.g. Siddaganga Institute of Technology"
                value={newCol.name}
                onChange={(e) => setNewCol({ ...newCol, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Short Code / Acronym *
                </label>
                <Input
                  required
                  placeholder="e.g. SIT"
                  value={newCol.shortCode}
                  onChange={(e) =>
                    setNewCol({ ...newCol, shortCode: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Karnataka District *
                </label>
                <Input
                  required
                  placeholder="e.g. Tumakuru"
                  value={newCol.district}
                  onChange={(e) =>
                    setNewCol({ ...newCol, district: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Placement Officer Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Prof. M. S. Kumar"
                  value={newCol.placementOfficer}
                  onChange={(e) =>
                    setNewCol({ ...newCol, placementOfficer: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Officer Email Address *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="placement@sit.ac.in"
                  value={newCol.officerEmail}
                  onChange={(e) =>
                    setNewCol({ ...newCol, officerEmail: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <Input
                  placeholder="+91 98450 12345"
                  value={newCol.officerPhone}
                  onChange={(e) =>
                    setNewCol({ ...newCol, officerPhone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Affiliated University
                </label>
                <Input
                  value={newCol.university}
                  onChange={(e) =>
                    setNewCol({ ...newCol, university: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Complete Onboarding
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
