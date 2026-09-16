import type { Metadata } from "next";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import PortalSwitcherBadge from "@/components/common/PortalSwitcherBadge";

export const metadata: Metadata = {
  title: "Global Quest Technologies | VTU & Industry Internship Portal",
  description:
    "Official Industry Internship & Campus Placement Platform by Global Quest Technologies in collaboration with VTU and premier engineering colleges in Karnataka.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-brand-slate text-brand-text antialiased selection:bg-brand-blue selection:text-white">
        {children}
        {/* Portal Switcher Badge for local dev preview */}
        <PortalSwitcherBadge />
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
