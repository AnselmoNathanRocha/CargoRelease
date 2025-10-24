import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Group({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex justify-center items-center w-full gap-2", className)} {...props} />
  );
}