import React from "react";
import PortalNavbar from "@/components/portal/PortalNavbar";
import PortalFooter from "@/components/portal/PortalFooter";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import FloatingScrollTop from "@/components/common/FloatingScrollTop";
import FloatingChatWidget from "@/components/common/FloatingChatWidget";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-slate">
      {/* Sticky Corporate Navigation */}
      <PortalNavbar />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Corporate 4-Column Footer */}
      <PortalFooter />

      {/* Floating Interactive Elements */}
      <FloatingWhatsApp />
      <FloatingScrollTop />
      <FloatingChatWidget />
    </div>
  );
}
