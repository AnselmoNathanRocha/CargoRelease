import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader2 size={20} className="animate-spin" />
    </div>
  );
}