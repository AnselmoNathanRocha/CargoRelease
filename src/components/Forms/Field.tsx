import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Field({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex w-full flex-col gap-0.5", className)} {...props} />
  );
}