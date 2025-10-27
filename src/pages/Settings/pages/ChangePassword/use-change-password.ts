import { queryClient } from "@/lib/react-query";
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

  const { data: settings } = useQuery({
    queryKey: ["password-last-updated-at"],
    queryFn: () => settingsService.getSettings(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ChangePasswordData) => authService.changePassword(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["password-last-updated-at"],
      });
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
  
  return {
    form,
    onSubmit: (data: ChangePasswordData) => mutate(data),
    isLoading: isPending,
    lastUpdatedAt: settings
      ? dayjs(settings.passwordLastUpdatedAt).format("DD/MM/YYYY [às] HH:mm")
      : undefined,
  }
}