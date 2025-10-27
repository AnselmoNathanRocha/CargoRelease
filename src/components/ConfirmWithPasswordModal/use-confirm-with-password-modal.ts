import { ConfirmPasswordData, confirmPasswordSchema } from "@/models/confirm-password";
import { authService } from "@/services/auth-service";
import { toastService } from "@/services/toast-service";
import { extractMessageFromAxiosErrorOrDefault } from "@/utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Ref, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";

export type ConfirmActionType = "CREATE" | "EDIT" | "DELETE";

export interface ConfirmWithPasswordModalRef<T = unknown> {
  open: (data?: T, action?: ConfirmActionType) => void;
}

interface Props<T> {
  ref: Ref<ConfirmWithPasswordModalRef<T>>;
  onConfirm: (data?: T, action?: ConfirmActionType) => void;
}

export function useConfirmWithPasswordModal<T>({ ref, onConfirm }: Props<T>) {
  const [currentData, setCurrentData] = useState<T | undefined>(undefined);
  const [currentAction, setCurrentAction] = useState<ConfirmActionType | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const form = useForm<ConfirmPasswordData>({
      resolver: zodResolver(confirmPasswordSchema),
    });

  useImperativeHandle(ref, () => ({
    open(data?: T, action?: ConfirmActionType) {
      setCurrentData(data);
      setCurrentAction(action);
      setIsOpen(true);
      form.reset();
    },
  }));

  const { mutate: validatePassword, isPending } = useMutation({
    mutationFn: (password: string) => authService.validateAdminPassword(password),
    onSuccess: (isValid) => {
      if (!isValid) {
        toastService.error("Senha de administrador incorreta!");
        return;
      }

      onConfirm(currentData, currentAction);
      onCancel();
    },
    onError: (error) => {
      toastService.error(
        extractMessageFromAxiosErrorOrDefault(
          error,
          "Erro ao validar senha de administrador!"
        )
      );
    },
  });

  const onCancel = () => {
    setIsOpen(false);
    form.reset();
  };
  
  return {
    isOpen,
    isValidating: isPending,
    form,
    onSubmit: (data: ConfirmPasswordData) => validatePassword(data.password),
    onCancel,
  }
}