import React from "react";
import HeroCarousel from "@/components/portal/home/HeroCarousel";
import CircularBoard from "@/components/portal/home/CircularBoard";
import PartnerLogos from "@/components/portal/home/PartnerLogos";
import CategoryGrid from "@/components/portal/home/CategoryGrid";
import FeaturedInternships from "@/components/portal/home/FeaturedInternships";
import VtuInternshipTable from "@/components/portal/home/VtuInternshipTable";
import NewsletterCard from "@/components/portal/home/NewsletterCard";
import CompanyShowcase from "@/components/portal/home/CompanyShowcase";
import StatsCounter from "@/components/portal/home/StatsCounter";
import TestimonialsSection from "@/components/portal/home/TestimonialsSection";
import FaqSection from "@/components/portal/home/FaqSection";

export default function HomePage() {
  return (
    <div>
      {/* Section 3 & 4: Hero Banner Carousel & Floating Search Card */}
      <HeroCarousel />

      {/* Section 5: Circular / Notification Board */}
      <CircularBoard />

      {/* Section 6: Industry Partners Logo Slider */}
      <PartnerLogos />

      {/* Section 7: 12 Internship Categories */}
      <CategoryGrid />

      {/* Section 8: Featured Internships Grid */}
      <FeaturedInternships />

      {/* Section 9: VTU-Style Internship Listing Table */}
      <VtuInternshipTable />

      {/* Section 10: Internship Alerts Subscription */}
      <NewsletterCard />

      {/* Section 11: Company Showcase */}
      <CompanyShowcase />

      {/* Section 12: Animated Statistics Counters */}
      <StatsCounter />

      {/* Section 13: Student Testimonials */}
      <TestimonialsSection />

      {/* Section 14: FAQ Accordion */}
      <FaqSection />
    </div>
  );
}
