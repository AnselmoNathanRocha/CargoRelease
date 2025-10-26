import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toastService } from "@/services/toast-service";
import { extractMessageFromAxiosErrorOrDefault } from "@/utils/functions";
import {
  RecoveryEmailData,
  recoveryEmailSchema,
} from "@/models/recovery-email";
import { settingsService } from "@/services/settings-service";
import { authService } from "@/services/auth-service";
import {
  RecoverPasswordData,
  recoverPasswordSchema,
} from "@/models/recover-password";

export function useRecoverPassword() {
  const emailForm = useForm<RecoveryEmailData>({
    resolver: zodResolver(recoveryEmailSchema),
  });

  const passwordForm = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const { mutate: updateEmail, isPending: isUpdatingEmail } = useMutation({
    mutationFn: (data: RecoveryEmailData) =>
      settingsService.updateRecoveryEmail(data),
    onSuccess: () => {
      emailForm.reset();
      toastService.success("E-mail de recuperação alterado com sucesso!");
    },
    onError: (error) => {
      toastService.error(
        extractMessageFromAxiosErrorOrDefault(
          error,
          "Erro ao alterar e-mail de recuperação!"
        )
      );
    },
  });

  const { mutate: recoverPassword, isPending: isRecoveringPassword } = useMutation({
    mutationFn: (data: RecoverPasswordData) =>
      authService.recoverPassword(data),
    onSuccess: () => {
      passwordForm.reset();
      toastService.success("Senha recuperada com sucesso!");
    },
    onError: (error) => {
      toastService.error(
        extractMessageFromAxiosErrorOrDefault(error, "Erro ao recuperar senha!")
      );
    },
  });

  return {
    emailForm,
    onUpdateEmail: (data: RecoveryEmailData) => updateEmail(data),
    isUpdatingEmail,
    passwordForm,
    onRecoverPassword: (data: RecoverPasswordData) => recoverPassword(data),
    isRecoveringPassword,
  };
}
