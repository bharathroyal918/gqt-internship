import React from "react";
import { SearchX } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search terms or clearing some active filters.",
  actionText,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-soft",
        className
      )}
    >
      <div className="h-16 w-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
        {icon || <SearchX className="h-8 w-8" />}
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1.5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="mt-5"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}
