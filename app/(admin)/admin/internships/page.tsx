"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import internshipsData from "@/data/internships.json";
import { Internship, InternshipStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Filter,
  DollarSign,
  Building2,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminInternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>(
    internshipsData as Internship[]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalItem, setDeleteModalItem] = useState<Internship | null>(null);
  const [previewItem, setPreviewItem] = useState<Internship | null>(null);

  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    let list = [...internships];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q) ||
          i.id.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      list = list.filter((i) => i.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      list = list.filter((i) => i.status === statusFilter);
    }

    return list;
  }, [internships, searchTerm, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const togglePublishStatus = (id: string) => {
    setInternships(
      internships.map((item) => {
        if (item.id === id) {
          const newStatus: InternshipStatus =
            item.status === "published" ? "draft" : "published";
          toast.success(
            `Internship ${newStatus === "published" ? "Published" : "Moved to Draft"}!`,
            { description: item.title }
          );
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteModalItem) return;
    setInternships(internships.filter((i) => i.id !== deleteModalItem.id));
    toast.error("Internship Listing Deleted", {
      description: `${deleteModalItem.title} removed from database.`,
    });
    setDeleteModalItem(null);
  };

  const categories = Array.from(new Set(internships.map((i) => i.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Internship Management ({internships.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, approve, toggle publishing status, and manage corporate internship postings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting internships dataset to CSV...")}
            className="rounded-xl text-xs"
          >
            <FileSpreadsheet className="h-4 w-4 mr-1 text-emerald-600" />
            <span>Export CSV</span>
          </Button>
          <Link href="/admin/internships/new">
            <Button variant="primary" size="sm" className="rounded-xl font-bold">
              <Plus className="h-4 w-4 mr-1" />
              <span>Add Internship</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, role, or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            <option value="">All Domains</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Internships Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Internship ID & Title</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Domain</th>
                <th className="py-3.5 px-4">Mode / Stipend</th>
                <th className="py-3.5 px-4">Applicants</th>
                <th className="py-3.5 px-4">Status / Publish Toggle</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] text-slate-400 font-bold block">
                      {item.id}
                    </span>
                    <span className="font-bold text-slate-900 text-sm block">
                      {item.title}
                    </span>
                    <span className="text-slate-500 text-[11px]">{item.duration}</span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {item.company}
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant="default" className="text-[10px]">
                      {item.category}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-emerald-700 font-mono block">
                      {item.stipend}
                    </span>
                    <span className="text-[10px] text-slate-500">{item.mode}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {item.applicantsCount} Applied
                  </td>

                  {/* Publish / Draft Toggle */}
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublishStatus(item.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold"
                    >
                      {item.status === "published" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span className="text-emerald-700">Published</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-500">Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewItem(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-slate-100 transition-colors"
                        title="Quick Preview"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <Link href={`/admin/internships/new?edit=${item.id}`}>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                          title="Edit Posting"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteModalItem(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} listings
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalItem && (
        <Modal
          isOpen={!!deleteModalItem}
          onClose={() => setDeleteModalItem(null)}
          title="Delete Internship Listing"
          description="Are you sure you want to permanently remove this posting?"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <p>
              Deleting <strong>{deleteModalItem.title}</strong> will remove it from student search results and archive all associated application logs.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteModalItem(null)}
              >
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
                Delete Posting
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Quick Preview Modal */}
      {previewItem && (
        <Modal
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
          title={previewItem.title}
          description={`${previewItem.company} • ${previewItem.category}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-slate-400 block">Stipend:</span>
                <span className="font-bold text-emerald-700 font-mono">
                  {previewItem.stipend}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Mode:</span>
                <span className="font-semibold text-slate-800">{previewItem.mode}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Location:</span>
                <span className="font-semibold text-slate-800">{previewItem.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Deadline:</span>
                <span className="font-mono text-slate-800">{previewItem.deadline}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Required Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {previewItem.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Eligibility</h4>
              <p className="p-2.5 rounded bg-blue-50 text-brand-blue font-medium">
                {previewItem.eligibility}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setPreviewItem(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
