"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import internshipsData from "@/data/internships.json";
import categoriesData from "@/data/categories.json";
import { Internship } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import ApplyModal from "@/components/common/ApplyModal";
import CompanyLogo from "@/components/common/CompanyLogo";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  Building2,
  CheckCircle2,
  Calendar,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

function InternshipsDirectoryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialMode = searchParams.get("mode") || "";
  const initialMinStipend = searchParams.get("minStipend") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMode, setSelectedMode] = useState(initialMode);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState("");
  const [minStipend, setMinStipend] = useState(initialMinStipend ? Number(initialMinStipend) : 0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedIds, setSavedIds] = useState<string[]>(["gqt-int-002", "gqt-int-005"]);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const itemsPerPage = 9;

  // Available skill tags
  const popularSkills = [
    "Python",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "Next.js",
    "Docker",
    "AWS",
    "Machine Learning",
    "Figma",
    "Cyber Security",
    "Embedded C",
  ];

  const filtered = useMemo(() => {
    let list = [...(internshipsData as Internship[])];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q) ||
          i.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      list = list.filter((i) => i.category === selectedCategory);
    }

    if (selectedMode) {
      list = list.filter((i) => i.mode === selectedMode);
    }

    if (selectedLocation) {
      list = list.filter((i) =>
        i.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedType) {
      list = list.filter((i) => i.type === selectedType);
    }

    if (minStipend > 0) {
      list = list.filter((i) => i.stipendAmount >= minStipend);
    }

    if (selectedSkills.length > 0) {
      list = list.filter((i) =>
        selectedSkills.every((s) => i.skills.includes(s))
      );
    }

    if (sortBy === "stipendHigh") {
      list.sort((a, b) => b.stipendAmount - a.stipendAmount);
    } else if (sortBy === "deadline") {
      list.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else {
      list.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    return list;
  }, [
    search,
    selectedCategory,
    selectedMode,
    selectedLocation,
    selectedType,
    minStipend,
    selectedSkills,
    sortBy,
  ]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setCurrentPage(1);
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
      toast.info("Removed from saved list");
    } else {
      setSavedIds([...savedIds, id]);
      toast.success("Saved to wishlist!");
    }
  };

  const handleShare = (internship: Internship, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/internships/${internship.id}`);
    toast.success("Share link copied to clipboard!");
  };

  const resetAll = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedMode("");
    setSelectedLocation("");
    setSelectedType("");
    setMinStipend(0);
    setSelectedSkills([]);
    setSortBy("recent");
    setCurrentPage(1);
  };

  return (
    <div className="bg-brand-slate min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-brand-blue">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Internships</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore All 100+ Internships
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                VTU accredited opportunities across Bangalore, Mysore, Mangalore, Hubballi, and Remote.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Showing <strong>{filtered.length}</strong> active openings</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-brand-blue" />
                  Filter Internships
                </span>
                {(selectedCategory || selectedMode || selectedLocation || selectedSkills.length > 0 || minStipend > 0) && (
                  <button
                    onClick={resetAll}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Technical Domain
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
                >
                  <option value="">All Domains ({categoriesData.length})</option>
                  {categoriesData.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Work Mode
                </label>
                <div className="space-y-1.5 text-xs">
                  {["", "Remote", "Hybrid", "On-site"].map((m) => (
                    <label
                      key={m}
                      className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900"
                    >
                      <input
                        type="radio"
                        name="mode"
                        checked={selectedMode === m}
                        onChange={() => {
                          setSelectedMode(m);
                          setCurrentPage(1);
                        }}
                        className="text-brand-blue focus:ring-brand-blue"
                      />
                      <span>{m === "" ? "All Modes" : m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
                >
                  <option value="">All Locations</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Hubballi">Hubballi - Dharwad</option>
                  <option value="Mangaluru">Mangaluru</option>
                  <option value="Belagavi">Belagavi</option>
                </select>
              </div>

              {/* Stipend Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Min Monthly Stipend
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    {minStipend > 0 ? `₹${minStipend.toLocaleString("en-IN")}` : "Any"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35000"
                  step="5000"
                  value={minStipend}
                  onChange={(e) => {
                    setMinStipend(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-brand-blue cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>₹0</span>
                  <span>₹15k</span>
                  <span>₹35k+</span>
                </div>
              </div>

              {/* Skills Multi-select chips */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Required Skills
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {popularSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors font-medium ${
                          isSelected
                            ? "bg-brand-blue text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Search + Sort + Grid/List Toggle */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Quick search openings..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue cursor-pointer"
                  >
                    <option value="recent">Newest Posted</option>
                    <option value="stipendHigh">Highest Stipend</option>
                    <option value="deadline">Application Deadline</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-brand-blue shadow-sm font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Grid View"
                    aria-label="Grid View"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-brand-blue shadow-sm font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="List View"
                    aria-label="List View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Rendering */}
            {filtered.length === 0 ? (
              <EmptyState
                title="No internships found matching your filters"
                description="Try clearing some skills or broadening your search terms."
                actionText="Reset All Filters"
                onAction={resetAll}
              />
            ) : viewMode === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginated.map((internship) => {
                  const isSaved = savedIds.includes(internship.id);

                  return (
                    <div
                      key={internship.id}
                      className="group bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="p-0.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex-shrink-0">
                              <CompanyLogo name={internship.company} size="sm" />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                {internship.company}
                              </p>
                              <Badge variant="default" className="text-[9px] px-1.5 py-0">
                                {internship.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={(e) => handleShare(internship, e)}
                              className="p-1.5 text-slate-400 hover:text-brand-blue rounded-lg hover:bg-slate-100"
                              aria-label="Share Internship"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => toggleSave(internship.id, e)}
                              className={`p-1.5 rounded-lg ${
                                isSaved
                                  ? "text-amber-500 bg-amber-50"
                                  : "text-slate-400 hover:text-amber-500 hover:bg-slate-100"
                              }`}
                              aria-label="Save Internship"
                            >
                              <Bookmark
                                className={`h-3.5 w-3.5 ${isSaved ? "fill-amber-500" : ""}`}
                              />
                            </button>
                          </div>
                        </div>

                        <Link href={`/internships/${internship.id}`}>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                            {internship.title}
                          </h3>
                        </Link>

                        <div className="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="flex items-center gap-1 text-[11px] text-slate-500">
                              <MapPin className="h-3 w-3" /> Location:
                            </span>
                            <span className="font-semibold truncate max-w-[130px]">
                              {internship.location}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-[11px] text-slate-500">
                              <DollarSign className="h-3 w-3" /> Stipend:
                            </span>
                            <span className="font-bold text-emerald-700 font-mono">
                              {internship.stipend}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {internship.skills.slice(0, 3).map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/internships/${internship.id}`}
                          className="text-xs font-semibold text-slate-600 hover:text-brand-blue"
                        >
                          View Details
                        </Link>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => setSelectedInternship(internship)}
                          className="text-xs h-8 px-3 rounded-lg"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft divide-y divide-slate-100 overflow-hidden">
                {paginated.map((internship) => (
                  <div
                    key={internship.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-blue-50/20 transition-colors group"
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <div className="p-0.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex-shrink-0 mt-0.5">
                        <CompanyLogo name={internship.company} size="md" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">
                          {internship.company}
                        </span>
                        <Badge variant="default" className="text-[10px]">
                          {internship.category}
                        </Badge>
                        <Badge variant="navy" className="text-[10px]">
                          {internship.mode}
                        </Badge>
                      </div>
                      <Link
                        href={`/internships/${internship.id}`}
                        className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors block"
                      >
                        {internship.title}
                      </Link>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {internship.location}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-700 font-bold font-mono">
                          <DollarSign className="h-3 w-3" /> {internship.stipend}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {internship.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Apply by {internship.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      <Link href={`/internships/${internship.id}`}>
                        <Button variant="outline" size="sm" className="rounded-xl">
                          Details
                        </Button>
                      </Link>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedInternship(internship)}
                        className="rounded-xl"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
                <span className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filtered.length)} of{" "}
                  {filtered.length} internships
                </span>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {selectedInternship && (
        <ApplyModal
          internship={selectedInternship}
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </div>
  );
}

export default function InternshipsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading Internships Directory...</div>}>
      <InternshipsDirectoryContent />
    </Suspense>
  );
}
