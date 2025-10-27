import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useEffect, useRef, useState } from "react";
import { queryClient } from "@/lib/react-query";
import { ConfirmWithPasswordModalRef } from "@/components/ConfirmWithPasswordModal/use-confirm-with-password-modal";

export function useRecoverPassword() {
  const confirmWithPasswordModalRef = useRef<ConfirmWithPasswordModalRef>(null);

  const [disabled, setDisabled] = useState(true);
  
  const emailForm = useForm<RecoveryEmailData>({
    resolver: zodResolver(recoveryEmailSchema),
  });

  const passwordForm = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const { data: recoveryEmail } = useQuery({
    queryKey: ["recovery-email"],
    queryFn: () => settingsService.getSettings(),
  });

  const { mutate: updateEmail, isPending: isUpdatingEmail } = useMutation({
    mutationFn: (data: RecoveryEmailData) =>
      settingsService.updateRecoveryEmail(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recovery-email"],
      });
      toastService.success("E-mail de recuperação alterado com sucesso!");
      setDisabled(true);
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

  const { mutate: generateCode, isPending: isGeneratingCode } = useMutation({
    mutationFn: () =>
      authService.generateRecoveryCode(),
    onSuccess: async () => {
      toastService.success("Código de recuperação enviado com sucesso!");
    },
    onError: (error) => {
      toastService.error(
        extractMessageFromAxiosErrorOrDefault(
          error,
          "Erro ao enviar código de recuperação para o e-mail!"
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

  useEffect(() => {
    if (recoveryEmail?.recoveryEmail) {
      emailForm.setValue("email", recoveryEmail.recoveryEmail);
    }
  }, [recoveryEmail, emailForm]);

  return {
    emailForm,
    onUpdateEmail: (data: RecoveryEmailData) => updateEmail(data),
    isUpdatingEmail,
    passwordForm,
    onRecoverPassword: (data: RecoverPasswordData) => recoverPassword(data),
    isRecoveringPassword,
    disabled,
    onEnable: () => setDisabled(false),
    generateCode: () => generateCode(),
    isGeneratingCode,
    confirmWithPasswordModalRef,
    handleUnlock: () => confirmWithPasswordModalRef?.current?.open(),
  };
}
