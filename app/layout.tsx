import type { Metadata } from "next";
import "@/styles/globals.css";
import ToasterProvider from "@/components/common/ToasterProvider";

export const metadata: Metadata = {
  title: "GQT Internship | Industry Immersion & Career Platform",
  description:
    "Official GQT Internship Platform by Global Quest Technologies offering accredited corporate internships, skill bootcamps, and career immersion.",
  icons: {
    icon: "/images/gqt-logo.jpeg",
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
        <ToasterProvider />
      </body>
    </html>
  );
}
