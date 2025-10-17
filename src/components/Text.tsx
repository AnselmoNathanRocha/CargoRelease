import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      heading: "text-3xl font-bold text-gray-800",
      subheading: "text-xl font-semibold text-gray-700",
      body: "text-base font-normal text-gray-600",
      caption: "text-sm font-light text-gray-500",
      link: "text-base font-medium underline",
    },
    color: {
      default: "text-gray-800",
      muted: "text-gray-400",
      error: "text-red-500",
      success: "text-green-500",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
  },
});

export type TextVariant = VariantProps<typeof textVariants>["variant"];
export type TextColor = VariantProps<typeof textVariants>["color"];
export type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    children: React.ReactNode;
  };

export function Text({ variant, color, className, children }: TextProps) {
  return (
    <p className={cn(textVariants({ variant, color }), className)}>
      {children}
    </p>
  );
}
