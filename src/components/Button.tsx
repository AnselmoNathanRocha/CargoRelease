import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { LucideIcon, LucideIconName } from "./LucideIcon";

const buttonVariants = cva(
  "relative flex items-center justify-center rounded-md font-semibold transition-colors cursor-pointer disabled:bg-gray-350 disabled:opacity-80 disabled:cursor-no-drop outline-none ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 ring-blue-500",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 ring-gray-400",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500",
        ghost: "bg-transparent text-gray-900 hover:opacity-90 focus:ring-gray-400",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-gray-400",
        link: "text-blue-600 underline hover:text-blue-500",
      },
      size: {
        small: "px-3 h-8 text-sm w-auto",
        medium: "px-6 h-10 text-base",
        large: "px-6 h-13 text-lg",
        full: "px-6 h-12 text-lg w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    leftIcon?: LucideIconName;
  };

export function Button({ variant, size, className, children, isLoading, disabled, leftIcon, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        className
      )}
      disabled={isLoading ?? disabled}
      {...props}
    >
      {isLoading && <LucideIcon name="loader2" size={20} className="animate-spin absolute" />}

      <span className={cn(
        "flex justify-center items-center gap-2",
        {
          "opacity-0": isLoading,
        }
      )}>
        {leftIcon && <LucideIcon name={leftIcon} />}
        {children}
      </span>
    </button>
  );
}
