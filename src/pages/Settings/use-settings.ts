import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

interface ResponsibleFormData {
  name: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface RecoveryFormData {
  securityCode: string;
  newPassword: string;
  confirmPassword: string;
}

interface Responsible {
  id: string;
  name: string;
}

export function useSettings() {
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);

  const responsibleForm = useForm<ResponsibleFormData>({
    defaultValues: {
      name: "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const recoveryForm = useForm<RecoveryFormData>({
    defaultValues: {
      securityCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onAddResponsible = (data: ResponsibleFormData) => {
    if (!data.name.trim()) {
      toast.error("Por favor, preencha o nome do responsável");
      return;
    }

    const newResponsible: Responsible = {
      id: crypto.randomUUID(),
      name: data.name,
    };

    setResponsibles((prev) => [...prev, newResponsible]);
    responsibleForm.reset();
    toast.success("Responsável adicionado com sucesso!");
  };

  const onDeleteResponsible = (id: string) => {
    setResponsibles((prev) => prev.filter((r) => r.id !== id));
    toast.success("Responsável removido com sucesso!");
  };

  const onChangePassword = (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (data.newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    toast.success("Senha alterada com sucesso!");
    passwordForm.reset();
  };

  const onRecoverPassword = (data: RecoveryFormData) => {
    if (!data.securityCode.trim()) {
      toast.error("Por favor, preencha o código de segurança");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (data.newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    toast.success("Senha recuperada com sucesso!");
    recoveryForm.reset();
  };

  return {
    responsibleForm,
    passwordForm,
    recoveryForm,
    responsibles,
    onAddResponsible,
    onDeleteResponsible,
    onChangePassword,
    onRecoverPassword,
  };
}
