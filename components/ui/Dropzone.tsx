"use client";

import React, { useState, useCallback } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFileAccepted?: (file: File) => void;
  accept?: DropzoneOptions["accept"];
  maxSize?: number;
  label?: string;
  hint?: string;
  className?: string;
}

export function Dropzone({
  onFileAccepted,
  accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  label = "Click or drag file to upload",
  hint = "Supports PDF, DOC, DOCX up to 5MB",
  className,
}: DropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileAccepted?.(file);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center",
          isDragActive
            ? "border-brand-blue bg-blue-50/50 scale-[1.01]"
            : "border-slate-200 hover:border-brand-blue/60 bg-slate-50/50 hover:bg-blue-50/20",
          selectedFile && "border-emerald-400 bg-emerald-50/20"
        )}
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <div className="flex items-center justify-between w-full max-w-sm bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-left truncate">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Remove uploaded file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-3">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800">{label}</p>
            <p className="text-xs text-slate-500 mt-1">{hint}</p>
          </>
        )}
      </div>
    </div>
  );
}
