import { queryClient } from "@/lib/react-query";
import { Register, RegisterData, registerSchema } from "@/models/register";
import { registerService } from "@/services/register-service";
import { toastService } from "@/services/toast-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Ref, useImperativeHandle, useRef, useState } from "react"
import { useForm } from "react-hook-form";

export interface RegsiterModalRef {
  open: (register?: Register) => void;
}

interface Props {
  ref: Ref<RegsiterModalRef>;
}

export function useRegisterModal ({ ref }: Props) {
  const registerToEdit = useRef<Register | undefined>(undefined);
  
	const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  useImperativeHandle(ref, () => ({
    open(register?: Register) {
      setIsOpen(true);

      registerToEdit.current = register;

      if (register) {
        form.reset({
          ...register,
          responsibleId: register.responsible.id,
        }, { keepValues: false });
      } else {
        form.reset(
          {
            date: dayjs().format("YYYY-MM-DD"),
            hours: dayjs().format("HH:mm"),
            active: "--",
          },
          { keepValues: false }
        );
      }
    },
  }));

  const isUpdate = !!registerToEdit.current;

	const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: RegisterData) => {
      const dataTransform: RegisterData = {
        ...data,
        viscosity: data.viscosity === "" ? null : String(Number(data.viscosity)),
      };  
      
      isUpdate
        ? await registerService.update(registerToEdit.current!.id, dataTransform)
        : await registerService.create(dataTransform)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["registers"],
      });

      toastService.success(
        `Registro ${isUpdate ? "atualizado" : "criado"} com sucesso!`,
      );

      onCancel();
    },
    onError(error) {
      if (error.status === 409) {
        toastService.error("Já existe um registro com esta OP");
        return;
      }

      toastService.error(
        error.response?.data?.message ??
          `Erro ao ${isUpdate ? "atualizar" : "criar"} registro`,
      );
    },
  });
	
	const onCancel = () => {
		setIsOpen(false);
	}
	
	return {
		form,
		isOpen,
		onSubmit: (data: RegisterData) => mutate(data),
		onCancel,
		isLoading,
		isUpdate,
	}
}