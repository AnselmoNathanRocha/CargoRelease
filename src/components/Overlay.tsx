import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export function Overlay({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 grid place-content-center rounded bg-black/30",
        className,
      )}
      {...props}
    />
  );
}