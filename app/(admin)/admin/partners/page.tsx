"use client";

import React, { useState } from "react";
import companiesData from "@/data/companies.json";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dropzone } from "@/components/ui/Dropzone";
import { Modal } from "@/components/ui/Modal";
import {
  Handshake,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ArrowUpDown,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

interface PartnerEntry {
  id: string;
  name: string;
  website: string;
  order: number;
  visible: boolean;
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerEntry[]>(
    companiesData.slice(0, 12).map((c, i) => ({
      id: `part-${i + 1}`,
      name: c.name,
      website: c.website,
      order: i + 1,
      visible: true,
    }))
  );

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerWebsite, setPartnerWebsite] = useState("https://");

  const toggleVisibility = (id: string) => {
    setPartners(
      partners.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p))
    );
    toast.success("Partner Marquee Visibility Toggled!");
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) return;

    const newPartner: PartnerEntry = {
      id: `part-${Date.now()}`,
      name: partnerName,
      website: partnerWebsite,
      order: partners.length + 1,
      visible: true,
    };

    setPartners([...partners, newPartner]);
    setAddModalOpen(false);
    setPartnerName("");
    toast.success("Partner Logo Added to Marquee!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Industry Partner Logos & Marquee
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure partner logos displayed on student portal home marquee and circular footers.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setAddModalOpen(true)}
          className="rounded-xl font-bold"
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Partner Logo</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Priority Order</th>
              <th className="py-3.5 px-4">Company Name</th>
              <th className="py-3.5 px-4">Website</th>
              <th className="py-3.5 px-4">Status on Home Marquee</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {partners.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-brand-blue">
                  #{p.order}
                </td>

                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-brand-blue font-extrabold flex items-center justify-center text-xs">
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span>{p.name}</span>
                </td>

                <td className="py-3.5 px-4 text-slate-500">
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <span>{p.website}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </td>

                <td className="py-3.5 px-4">
                  <button
                    onClick={() => toggleVisibility(p.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                      p.visible
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {p.visible ? (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() =>
                      setPartners(partners.filter((item) => item.id !== p.id))
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                    title="Remove Partner"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Partner Modal */}
      {addModalOpen && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Add Industry Partner"
          description="Upload partner brand logo for home page horizontal slider"
          maxWidth="sm"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Partner Organization Name *
              </label>
              <Input
                required
                placeholder="e.g. Mercedes-Benz R&D"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Website
              </label>
              <Input
                value={partnerWebsite}
                onChange={(e) => setPartnerWebsite(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Partner Logo File
              </label>
              <Dropzone label="Upload SVG or PNG logo" hint="Max 2MB" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Add to Slider
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
