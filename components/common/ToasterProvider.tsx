"use client";

import { Toaster as SonnerToaster } from "sonner";

export default function ToasterProvider() {
  return (
    <SonnerToaster
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
  );
}
