import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("ml-2 text-xs font-medium text-gray-500", className)}
      {...props}
    />
  );
}