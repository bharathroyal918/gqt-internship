import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-full px-2.5 py-0.5 text-xs transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-50 text-brand-blue border border-blue-200",
        navy: "bg-brand-navy text-white",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border border-amber-200",
        danger: "bg-rose-50 text-rose-700 border border-rose-200",
        purple: "bg-purple-50 text-purple-700 border border-purple-200",
        outline: "border border-slate-300 text-slate-700 bg-white",
        gold: "bg-amber-100 text-amber-900 border border-amber-300 font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
