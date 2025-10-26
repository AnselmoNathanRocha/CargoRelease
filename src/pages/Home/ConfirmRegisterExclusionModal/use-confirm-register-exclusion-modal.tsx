import { queryClient } from "@/lib/react-query";
import { Register } from "@/models/register";
import { registerService } from "@/services/register-service";
import { toastService } from "@/services/toast-service";
import { useMutation } from "@tanstack/react-query";
import { Ref, useImperativeHandle, useState } from "react";

export interface ConfirmRegisterExclusionModalRef {
  open(register: Register): void;
}

interface Props {
  ref: Ref<ConfirmRegisterExclusionModalRef>;
}

export function useConfirmRegisterExclusionModal({ ref }: Props) {
  const [register, setRegister] = useState<Register | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    open(Register: Register) {
      setRegister(Register);
    },
  }));

  const { mutate: handleConfirmDelete, isPending: isPendingDelete } =
    useMutation({
      mutationFn: () => registerService.delete(register!.id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["registers"],
        });

        toastService.success("Registro deletado com sucesso!");

        closeModal();
      },
      onError: (error) => {
        toastService.error(
          error.response?.data?.message ?? "Erro ao deletar o registro",
        );
      },
    });

  function closeModal() {
    setRegister(undefined);
  }

  return {
    isOpen: !!register,
    closeModal,
    handleConfirmDelete,
    isPendingDelete,
  };
}