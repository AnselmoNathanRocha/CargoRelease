import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

interface Props {
  className?: string;
  size?: number;
}

export function Loader({ className, size = 20, ...props }: Props) {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader2 size={size} className={cn("animate-spin", className)} {...props} />
    </div>
  );
}