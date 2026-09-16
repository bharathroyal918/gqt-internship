"use client";

import React, { useState } from "react";
import circularsData from "@/data/circulars.json";
import { Circular, CircularCategory, CircularPriority } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  BellRing,
  Plus,
  Search,
  Pin,
  Megaphone,
  Calendar,
  FileText,
  Archive,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminCircularsPage() {
  const [circulars, setCirculars] = useState<Circular[]>(
    circularsData as Circular[]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [previewCircular, setPreviewCircular] = useState<Circular | null>(null);

  // New Circular State
  const [newTitle, setNewTitle] = useState("");
  const [newRef, setNewRef] = useState(`VTU/GQT/2026/${Math.floor(100 + Math.random() * 900)}`);
  const [newCategory, setNewCategory] = useState<CircularCategory>("Latest");
  const [newPriority, setNewPriority] = useState<CircularPriority>("High");
  const [newContent, setNewContent] = useState("");
  const [newTicker, setNewTicker] = useState(true);
  const [newPinned, setNewPinned] = useState(false);

  const filtered = circulars.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.refNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePin = (id: string) => {
    setCirculars(
      circulars.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
    toast.success("Circular Pin Status Updated!");
  };

  const toggleTicker = (id: string) => {
    setCirculars(
      circulars.map((c) =>
        c.id === id ? { ...c, showInTicker: !c.showInTicker } : c
      )
    );
    toast.success("Ticker Broadcast Status Updated!");
  };

  const handleArchive = (id: string) => {
    setCirculars(circulars.filter((c) => c.id !== id));
    toast.info("Circular Archived to University Records");
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Circular = {
      id: `circ-${Date.now()}`,
      title: newTitle,
      refNo: newRef,
      category: newCategory,
      date: "Today, 16 Sep 2026",
      priority: newPriority,
      excerpt: newContent.slice(0, 120) + "...",
      content: newContent,
      pinned: newPinned,
      showInTicker: newTicker,
      department: "VTU Academic Directorate",
    };

    setCirculars([created, ...circulars]);
    setCreateModalOpen(false);
    toast.success("Circular Published to Student Portal!", {
      description: `Ref: ${created.refNo} broadcasted to all active dashboards.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Circulars & Academic Notices ({circulars.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish official VTU internship guidelines, placement drive announcements, and exam notices.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setCreateModalOpen(true)}
          className="rounded-xl font-bold"
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>Publish New Notice</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search circulars by subject or reference number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>
      </div>

      {/* Circulars Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ref No & Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Ticker / Pinned</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((circ) => (
                <tr key={circ.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] text-slate-400 font-bold block">
                      {circ.refNo}
                    </span>
                    <span className="font-bold text-slate-900 text-sm block max-w-md truncate">
                      {circ.title}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant="default">{circ.category}</Badge>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {circ.date}
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        circ.priority === "Urgent"
                          ? "danger"
                          : circ.priority === "High"
                          ? "warning"
                          : "default"
                      }
                    >
                      {circ.priority}
                    </Badge>
                  </td>

                  {/* Ticker / Pin controls */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleTicker(circ.id)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                          circ.showInTicker
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-slate-100 text-slate-400 hover:text-slate-600"
                        }`}
                        title="Toggle Top Breaking News Ticker Display"
                      >
                        {circ.showInTicker ? "On Ticker" : "Hidden"}
                      </button>
                      <button
                        onClick={() => togglePin(circ.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          circ.pinned
                            ? "text-amber-500 bg-amber-50"
                            : "text-slate-300 hover:text-slate-600"
                        }`}
                        title="Pin to Top of Notice Board"
                      >
                        <Pin className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewCircular(circ)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-slate-100"
                        title="Preview Directive"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleArchive(circ.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                        title="Archive Directive"
                      >
                        <Archive className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Circular Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Publish Official Academic Circular"
          description="Directly broadcasts to Student Portal top marquee ticker & circular board"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Notice Title *
              </label>
              <Input
                required
                placeholder="e.g. Schedule of 8th Semester Internship Viva Voce"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reference No *
                </label>
                <Input
                  required
                  value={newRef}
                  onChange={(e) => setNewRef(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <Select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as CircularCategory)
                  }
                >
                  <option value="Latest">Latest</option>
                  <option value="Placement">Placement</option>
                  <option value="Exam">Exam</option>
                  <option value="Training">Training</option>
                </Select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Priority
                </label>
                <Select
                  value={newPriority}
                  onChange={(e) =>
                    setNewPriority(e.target.value as CircularPriority)
                  }
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Directive Full Text Content *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Type official notification instructions..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={newTicker}
                  onChange={(e) => setNewTicker(e.target.checked)}
                  className="rounded text-brand-blue"
                />
                <span>Broadcast on Top News Ticker</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={newPinned}
                  onChange={(e) => setNewPinned(e.target.checked)}
                  className="rounded text-brand-blue"
                />
                <span>Pin to Top of Notice Board</span>
              </label>
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
                Publish Directive
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Preview Modal */}
      {previewCircular && (
        <Modal
          isOpen={!!previewCircular}
          onClose={() => setPreviewCircular(null)}
          title={previewCircular.title}
          description={`Ref: ${previewCircular.refNo} • Published: ${previewCircular.date}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <span>
                Department: <strong>{previewCircular.department}</strong>
              </span>
              <Badge variant="default">{previewCircular.category}</Badge>
            </div>
            <p className="leading-relaxed whitespace-pre-line p-4 bg-white border border-slate-200 rounded-xl">
              {previewCircular.content}
            </p>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewCircular(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
