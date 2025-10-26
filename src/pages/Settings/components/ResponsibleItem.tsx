import { User, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";

interface ResponsibleItemProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ResponsibleItem({ id, name, onDelete, isLoading, disabled }: ResponsibleItemProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 hover:border-blue-700 hover:bg-blue-50/50 transition-all group">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full p-2 group-hover:bg-blue-700 transition-colors">
          <User className="size-4 text-blue-700 group-hover:text-white transition-colors" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <Button
        variant="ghost"
        size="small"
        isLoading={isLoading}
        disabled={disabled || isLoading}
        onClick={() => onDelete(id)}
        className="text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
