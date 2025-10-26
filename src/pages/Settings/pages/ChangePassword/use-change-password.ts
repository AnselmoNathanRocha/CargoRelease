import { ChangePasswordData, changePasswordSchema } from "@/models/change-password";
import { authService } from "@/services/auth-service";
import { settingsService } from "@/services/settings-service";
import { toastService } from "@/services/toast-service";
import { extractMessageFromAxiosErrorOrDefault } from "@/utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

export function useChangePassword () {
  const form = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { data: lastUpdatedAt } = useQuery({
    queryKey: ["password-last-updated-at"],
    queryFn: () => settingsService.getPasswordLastUpdatedAt(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ChangePasswordData) => authService.changePassword(data),
    onSuccess: () => {
      form.reset();
      toastService.success("Senha alterada com sucesso!");
    },
    onError: (error) => {
      toastService.error(
        extractMessageFromAxiosErrorOrDefault(
          error,
          "Erro ao alterar senha!"
        )
      );
    },
  });
  
  const rawLastUpdatedAt =
    (lastUpdatedAt as any)?.lastUpdatedAt ?? (lastUpdatedAt as any)?.data?.lastUpdatedAt;

  return {
    form,
    onSubmit: (data: ChangePasswordData) => mutate(data),
    isLoading: isPending,
    lastUpdatedAt: rawLastUpdatedAt
      ? dayjs(rawLastUpdatedAt).format("DD/MM/YYYY [às] HH:mm")
      : undefined
  }
}