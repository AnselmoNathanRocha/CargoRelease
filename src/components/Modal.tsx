import { Dialog } from "@radix-ui/react-dialog";
import { Ref } from "react";
import { Button } from "./Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";

interface Props {
  ref?: Ref<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
  loading?: boolean;
  title?: string;
  confirmLabel?: string;
  customFooter?: React.ReactNode;
}

export function Modal({
  ref,
  isOpen,
  onClose,
  children,
  onConfirm,
  loading,
  title,
  confirmLabel = "Salvar",
  customFooter,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={ref}>
        <DialogDescription className="sr-only">{title}</DialogDescription>

        <DialogTitle className="max-h-8/12 text-xl text-zinc-700">
          {title}
        </DialogTitle>

        {children}

        <DialogFooter className="flex justify-end gap-2">
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            {customFooter ??
              (onConfirm && (
                <Button type="submit" onClick={onConfirm} disabled={loading}>
                  {loading ? "Carregando..." : confirmLabel}
                </Button>
              ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}