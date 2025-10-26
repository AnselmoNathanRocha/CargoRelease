import { useState } from "react";

interface UseConfirmWithPasswordOptions {
  onConfirm: (password: string) => void | Promise<void>;
  title?: string;
  description?: string;
  confirmLabel?: string;
  variant?: "danger" | "warning";
}

export function useConfirmWithPassword({
  onConfirm,
  title,
  description,
  confirmLabel,
  variant = "warning",
}: UseConfirmWithPasswordOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  const handleConfirm = async (password: string) => {
    setIsLoading(true);
    try {
      await onConfirm(password);
      close();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isOpen,
    isLoading,
    open,
    close,
    handleConfirm,
    modalProps: {
      isOpen,
      onClose: close,
      onConfirm: handleConfirm,
      title,
      description,
      confirmLabel,
      isLoading,
      variant,
    },
  };
}
