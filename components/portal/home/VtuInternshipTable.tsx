"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import internshipsData from "@/data/internships.json";
import { Internship } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import ApplyModal from "@/components/common/ApplyModal";
import CompanyLogo from "@/components/common/CompanyLogo";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Building2,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Eye,
  CheckCircle2,
} from "lucide-react";

export default function VtuInternshipTable() {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredInternships = useMemo(() => {
    let list = [...(internshipsData as Internship[])];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q) ||
          i.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory) {
      list = list.filter((i) => i.category === selectedCategory);
    }

    // Location
    if (selectedLocation) {
      list = list.filter((i) =>
        i.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Mode
    if (selectedMode) {
      list = list.filter((i) => i.mode === selectedMode);
    }

    // Type
    if (selectedType) {
      list = list.filter((i) => i.type === selectedType);
    }

    // Sort
    if (sortBy === "stipendHigh") {
      list.sort((a, b) => b.stipendAmount - a.stipendAmount);
    } else if (sortBy === "deadline") {
      list.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else {
      // Recent default
      list.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    return list;
  }, [searchTerm, selectedCategory, selectedLocation, selectedMode, selectedType, sortBy]);

  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const paginatedItems = filteredInternships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedMode("");
    setSelectedType("");
    setSortBy("recent");
    setCurrentPage(1);
  };

  const categories = Array.from(
    new Set((internshipsData as Internship[]).map((i) => i.category))
  );

  return (
    <section className="py-20 bg-brand-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
            <span>Pan-India Corporate Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Internship Listing Table
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Filter, compare, and apply to 100+ verified industry openings across India and remote.
          </p>
        </div>

        {/* Filter Control Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-200/80 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills, roles, companies..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Dropdown */}
            <div>
              <select
                value={selectedMode}
                onChange={(e) => {
                  setSelectedMode(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
              >
                <option value="">All Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Location Dropdown */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
              >
                <option value="">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mysuru">Mysuru</option>
                <option value="Hubballi">Hubballi</option>
                <option value="Mangaluru">Mangaluru</option>
                <option value="Belagavi">Belagavi</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
              >
                <option value="recent">Newest First</option>
                <option value="stipendHigh">Stipend: High to Low</option>
                <option value="deadline">Application Deadline</option>
              </select>
            </div>
          </div>

          {/* Active Filter Metrics & Reset */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing <strong>{filteredInternships.length}</strong> matching internships
            </span>
            {(searchTerm || selectedCategory || selectedMode || selectedLocation || selectedType) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        {filteredInternships.length === 0 ? (
          <EmptyState
            title="No internships found matching criteria"
            description="Try changing your search terms or clearing selected category filters."
            actionText="Clear All Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200/80 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Company & Role</th>
                    <th className="py-3.5 px-4">Domain / Category</th>
                    <th className="py-3.5 px-4">Location & Mode</th>
                    <th className="py-3.5 px-4">Duration</th>
                    <th className="py-3.5 px-4">Stipend</th>
                    <th className="py-3.5 px-4">Deadline</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      {/* Company & Role */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-0.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex-shrink-0">
                            <CompanyLogo name={item.company} size="sm" />
                          </div>
                          <div>
                            <Link
                              href={`/internships/${item.id}`}
                              className="font-bold text-slate-900 group-hover:text-brand-blue transition-colors block text-sm"
                            >
                              {item.title}
                            </Link>
                            <span className="text-slate-500 text-[11px]">
                              {item.company}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Domain */}
                      <td className="py-4 px-4">
                        <Badge variant="default" className="text-[10px]">
                          {item.category}
                        </Badge>
                      </td>

                      {/* Location & Mode */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <p className="text-slate-800 font-medium truncate max-w-[140px]">
                            {item.location}
                          </p>
                          <Badge variant="navy" className="text-[9px] px-1.5 py-0">
                            {item.mode}
                          </Badge>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4 font-medium text-slate-700">
                        {item.duration}
                      </td>

                      {/* Stipend */}
                      <td className="py-4 px-4 font-bold text-emerald-700 font-mono">
                        {item.stipend}
                      </td>

                      {/* Deadline */}
                      <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                        {item.deadline}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/internships/${item.id}`}>
                            <button
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-brand-blue hover:bg-slate-50 transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          </Link>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setSelectedInternship(item)}
                            className="text-xs h-8 px-3 rounded-lg"
                          >
                            Apply
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards (Responsive fallback) */}
            <div className="md:hidden divide-y divide-slate-100 p-4 space-y-4">
              {paginatedItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-0.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex-shrink-0">
                        <CompanyLogo name={item.company} size="sm" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {item.company}
                        </span>
                        <Link
                          href={`/internships/${item.id}`}
                          className="text-sm font-bold text-slate-900 block"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </div>
                    <Badge variant="navy" className="text-[10px]">
                      {item.mode}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Stipend:</span>
                      <span className="font-bold text-emerald-700">{item.stipend}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Location:</span>
                      <span className="truncate block">{item.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href={`/internships/${item.id}`}
                      className="text-xs font-semibold text-brand-blue"
                    >
                      View Details →
                    </Link>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedInternship(item)}
                      className="h-8 text-xs"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {selectedInternship && (
        <ApplyModal
          internship={selectedInternship}
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </section>
  );
}
