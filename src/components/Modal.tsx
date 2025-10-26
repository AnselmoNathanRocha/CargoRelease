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
  confirmButton?: React.ReactNode;
  customFooter?: React.ReactNode;
  contentClassName?: string;
}

export function Modal({
  ref,
  isOpen,
  onClose,
  children,
  onConfirm,
  loading,
  title,
  confirmButton,
  customFooter,
  contentClassName,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={ref} 
        className={contentClassName}
      >
        <DialogDescription className="sr-only">{title}</DialogDescription>

        <DialogTitle className="max-h-8/12 text-xl text-zinc-700">
          {title}
        </DialogTitle>

        {children}

        <DialogFooter className="flex justify-end gap-2">
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            {customFooter ??
              (onConfirm && (
                <Button 
                  onClick={onConfirm} 
                  isLoading={loading}
                  disabled={loading}
                >
                  {confirmButton ?? "Salvar"}
                </Button>
              ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}