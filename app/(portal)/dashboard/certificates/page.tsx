"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Award,
  Download,
  Eye,
  ShieldCheck,
  QrCode,
  CheckCircle2,
  Calendar,
  Building2,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

interface CertificateItem {
  id: string;
  title: string;
  recipient: string;
  usn: string;
  college: string;
  company: string;
  domain: string;
  duration: string;
  issueDate: string;
  verificationHash: string;
  grade: string;
}

const certificates: CertificateItem[] = [
  {
    id: "CERT-VTU-2026-0819",
    title: "Certificate of Industrial Internship Completion",
    recipient: "Bharath Royal",
    usn: "23785A3102",
    college: "RVS university",
    company: "Global Quest Labs",
    domain: "AI & ML",
    duration: "4 Months (600 Hours)",
    issueDate: "17 September 2026",
    verificationHash: "0x8F9C3E14B72A99D8F3E1",
    grade: "Grade: Outstanding (O)",
  },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handleDownload = (cert: CertificateItem) => {
    toast.success("Downloading Certificate PDF...", {
      description: `${cert.title} (${cert.id}.pdf)`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Verified Academic Certificates
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Cryptographically signed completion credentials recognized by VTU and corporate recruiters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-brand-blue to-amber-400" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">
                      ID: {cert.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {cert.domain}
                    </h3>
                  </div>
                </div>
                <Badge variant="success" className="text-[10px]">
                  VTU Verified
                </Badge>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Awarded To:</span>
                  <span className="font-bold text-slate-800">{cert.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seat Number (USN):</span>
                  <span className="font-mono font-semibold text-brand-blue">
                    {cert.usn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sponsoring Partner:</span>
                  <span className="font-semibold text-slate-800">{cert.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Evaluation:</span>
                  <span className="font-bold text-emerald-700">{cert.grade}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Hash: {cert.verificationHash.slice(0, 10)}...
                </span>
                <span>Issued: {cert.issueDate}</span>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCert(cert)}
                className="rounded-xl"
              >
                <Eye className="h-3.5 w-3.5 mr-1" />
                <span>Preview Certificate</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownload(cert)}
                className="rounded-xl"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                <span>Download PDF</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title="Digital Certificate Preview"
          description="Official credentials with VTU academic seal"
          maxWidth="3xl"
        >
          <div className="p-6 sm:p-10 bg-gradient-to-br from-amber-50/40 via-white to-blue-50/30 rounded-2xl border-4 border-double border-amber-300/80 text-center space-y-6 relative shadow-inner">
            {/* Header Logos */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center">
                  <Image
                    src="/images/gqt-logo.jpeg"
                    alt="Global Quest Technologies"
                    width={130}
                    height={46}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="text-left text-[11px]">
                  <span className="font-extrabold text-brand-navy block">
                    GLOBAL QUEST TECHNOLOGIES
                  </span>
                  <span className="text-slate-500">Center for Industry Immersion</span>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-500">
                <span className="font-bold text-slate-700 block">VTU Affiliated</span>
                <span>Belagavi, Karnataka</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-xs font-serif uppercase tracking-widest text-amber-800 font-bold">
                Certificate of Industrial Internship
              </span>
              <p className="text-xs text-slate-500 italic">This is to certify that</p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 underline decoration-amber-400 underline-offset-8 py-1">
                {selectedCert.recipient}
              </h2>
              <p className="text-xs font-mono text-slate-600">
                USN: <strong>{selectedCert.usn}</strong> • {selectedCert.college}
              </p>
            </div>

            {/* Body */}
            <p className="text-xs text-slate-700 leading-relaxed max-w-xl mx-auto">
              has successfully completed a <strong>{selectedCert.duration}</strong> curriculum industrial internship in <strong>{selectedCert.domain}</strong> in association with <strong>{selectedCert.company}</strong>, fulfilling all academic norms and evaluation rubrics under VTU Internship Regulations with <strong>{selectedCert.grade}</strong>.
            </p>

            {/* Signatures & QR Code */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 items-center text-center text-xs">
              <div>
                <div className="h-8 font-serif italic text-brand-blue font-bold">
                  Dr. Arvind K. Swamy
                </div>
                <p className="border-t border-slate-300 pt-1 text-[10px] text-slate-500">
                  Managing Director, GQT
                </p>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="h-16 w-16 p-1 bg-white border border-slate-300 rounded-lg shadow-sm flex items-center justify-center">
                  <QrCode className="h-14 w-14 text-slate-800" />
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">
                  verify.gqtech.in
                </span>
              </div>

              <div>
                <div className="h-8 font-serif italic text-brand-navy font-bold">
                  Dr. Malathi N. Rao
                </div>
                <p className="border-t border-slate-300 pt-1 text-[10px] text-slate-500">
                  Chief Academic Officer
                </p>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-400 pt-2">
              Cryptographic Token: {selectedCert.verificationHash}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setSelectedCert(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleDownload(selectedCert)}
            >
              <Download className="h-4 w-4 mr-1" />
              <span>Download Official PDF</span>
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
