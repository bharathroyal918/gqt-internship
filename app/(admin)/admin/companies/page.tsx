"use client";

import React, { useState } from "react";
import companiesData from "@/data/companies.json";
import { Company } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dropzone } from "@/components/ui/Dropzone";
import {
  Building2,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  Star,
  Users,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>(
    companiesData as Company[]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Company form state
  const [newCompany, setNewCompany] = useState({
    name: "",
    domain: "Software & Digital Engineering",
    location: "Bengaluru, Karnataka",
    tier: "Enterprise" as Company["tier"],
    website: "https://",
    linkedin: "https://linkedin.com/company/",
    employees: "5,000+",
    about: "",
  });

  const filtered = companies.filter((c) => {
    const matchesTier = tierFilter === "all" || c.tier === tierFilter;
    const matchesSearch =
      !searchTerm ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Company = {
      id: `comp-${Date.now()}`,
      name: newCompany.name,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        newCompany.name
      )}&background=0B5ED7&color=fff&size=128&bold=true`,
      domain: newCompany.domain,
      location: newCompany.location,
      openRoles: 1,
      rating: 4.8,
      reviewsCount: 12,
      website: newCompany.website,
      linkedin: newCompany.linkedin,
      about:
        newCompany.about ||
        `${newCompany.name} is an active corporate partner hiring VTU students through the GQT Portal.`,
      tier: newCompany.tier,
      verified: true,
      foundedYear: 2018,
      employees: newCompany.employees,
    };

    setCompanies([created, ...companies]);
    setAddModalOpen(false);
    toast.success("Corporate Partner Onboarded!", {
      description: `${created.name} added to the partner directory.`,
    });
  };

  const handleDelete = (id: string, name: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
    toast.info("Company Removed", { description: name });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Corporate Partner Management ({companies.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage enterprise hiring accounts, GCC partnerships, and campus recruitment quota.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setAddModalOpen(true)}
          className="rounded-xl font-bold"
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Corporate Partner</span>
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search company or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400">Tier Filter:</span>
          {["all", "Enterprise", "Global Partner", "Scale-up", "Startup"].map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                tierFilter === t
                  ? "bg-brand-blue text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t === "all" ? "All Partners" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 border border-slate-200 flex items-center justify-center font-bold text-brand-blue text-base">
                    {comp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>{comp.name}</span>
                      {comp.verified && (
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-500">{comp.domain}</p>
                  </div>
                </div>

                <Badge variant={comp.tier === "Enterprise" ? "navy" : "gold"}>
                  {comp.tier}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 my-3 p-3 bg-slate-50 rounded-xl">
                <p className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{comp.location}</span>
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span>{comp.employees} Team</span>
                  <span className="font-bold text-brand-blue">
                    {comp.openRoles} Active Openings
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={comp.website}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-brand-blue flex items-center gap-1 text-[11px]"
              >
                <span>Website</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    toast.info("Edit Company modal ready for adjustments")
                  }
                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100"
                  title="Edit Company"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(comp.id, comp.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                  title="Delete Company"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Company Modal */}
      {addModalOpen && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Onboard Corporate Partner"
          description="Register an enterprise or GCC hiring account on GQT Portal"
          maxWidth="lg"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Company Name *
              </label>
              <Input
                required
                placeholder="e.g. Cisco Systems India"
                value={newCompany.name}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Industry Domain
                </label>
                <Input
                  value={newCompany.domain}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, domain: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tier Classification
                </label>
                <Select
                  value={newCompany.tier}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      tier: e.target.value as Company["tier"],
                    })
                  }
                >
                  <option value="Enterprise">Enterprise</option>
                  <option value="Global Partner">Global Partner</option>
                  <option value="Scale-up">Scale-up</option>
                  <option value="Startup">Startup</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Office Location
                </label>
                <Input
                  value={newCompany.location}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Official Website
                </label>
                <Input
                  value={newCompany.website}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, website: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Company Logo Upload
              </label>
              <Dropzone label="Drop SVG or PNG logo" hint="Max 2MB" />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Onboard
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
