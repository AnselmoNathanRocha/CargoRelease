import { ConfirmWithPasswordModalRef } from "@/components/ConfirmWithPasswordModal/use-confirm-with-password-modal";
import { queryClient } from "@/lib/react-query";
import { CreateResponsibleData, createResponsibleSchema } from "@/models/responsible";
import { responsibleService } from "@/services/responsible-service";
import { toastService } from "@/services/toast-service";
import { EXPIRATE_IN_MINUTES, UNLOCK_DURATION } from "@/utils/constants";
import { extractMessageFromAxiosErrorOrDefault } from "@/utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function useResponsiblePage() {
  const confirmWithPasswordModalRef = useRef<ConfirmWithPasswordModalRef>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const form = useForm<CreateResponsibleData>({
    resolver: zodResolver(createResponsibleSchema),
  });

  const { data, isFetching } = useQuery({
    queryKey: ["responsible"],
    queryFn: () => responsibleService.getAll(),
  });

  const { mutate: createMutate, isPending: isCreating } = useMutation({
    mutationFn: (data: CreateResponsibleData) =>
      responsibleService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["responsible"],
      });
      form.reset();
      toastService.success("Responsável criado com sucesso!");
    },
    onError(error) {
      toastService.error(
        extractMessageFromAxiosErrorOrDefault(
          error,
          "Erro ao criar responsável!",
        ),
      );
    },
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      await responsibleService.delete(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["responsible"],
      });
      toastService.success("Responsável excluído com sucesso!");
    },
    onError(error) {
      toastService.error(
        extractMessageFromAxiosErrorOrDefault(
          error,
          "Erro ao excluir responsável!",
        ),
      );
    },
  });
  
  useEffect(() => {
    if (isUnlocked) {
      const timeout = setTimeout(() => {
        setIsUnlocked(false);
        toastService.error("Acesso bloqueado por inatividade");
      }, UNLOCK_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [isUnlocked]);

  const handleUnlock = () => {
    confirmWithPasswordModalRef?.current?.open();
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  const onUnlockConfirm = () => {
    setIsUnlocked(true);
    toastService.success(`Edição desbloqueada por ${EXPIRATE_IN_MINUTES} minutos`);
  };

  const handleCreate = () => {
    if (!isUnlocked) {
      toastService.error("Desbloqueie a edição para adicionar responsáveis");
      return;
    }
    createMutate(form.getValues());
  };

  const handleDelete = (id: string) => {
    if (!isUnlocked) {
      toastService.error("Desbloqueie a edição para excluir responsáveis");
      return;
    }
    deleteMutate(id);
  };

  return {
    form,
    responsibles: data ?? [],
    isLoadingGetResponsibles: isFetching,
    isLoadingCreateResponsibles: isCreating,
    isLoadingDeleteResponsible: isDeleting,
    deletingId,
    isUnlocked,
    confirmWithPasswordModalRef,
    handleUnlock,
    handleLock,
    onUnlockConfirm,
    handleCreate,
    handleDelete,
  }
}