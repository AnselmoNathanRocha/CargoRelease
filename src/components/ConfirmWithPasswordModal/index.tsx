import { Form } from "../Forms";
import { ConfirmWithPasswordModalRef, useConfirmWithPasswordModal } from "./use-confirm-with-password-modal";
import { Modal } from "../Modal";
import { AlertTriangleIcon, ShieldCheck } from "lucide-react";
import { Ref } from "react";

interface Props<T> {
  ref: Ref<ConfirmWithPasswordModalRef<T>>;
  onConfirm: (data?: T) => void;
}

export function ConfirmWithPasswordModal<T>({ ref, onConfirm }: Props<T>) {
  const { isOpen, form, onSubmit, onCancel, isValidating } =
    useConfirmWithPasswordModal<T>({ ref, onConfirm });

  return (
    <Modal
      title="Confirmar Ação"
      isOpen={isOpen}
      onConfirm={form.handleSubmit(onSubmit)}
      onClose={onCancel}
      loading={isValidating}
      contentClassName="max-w-[400px]"
      confirmButton={<><ShieldCheck size={18} /> Autenticar</>}
    >
      <div className="flex items-start gap-3 p-3 rounded-md bg-yellow-50 border border-yellow-200 mb-4">
        <AlertTriangleIcon className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-medium text-yellow-800">Atenção:</span> esta ação requer autenticação.  
          Digite a <span className="font-semibold">senha de administrador</span> para continuar.
        </p>
      </div>

      <Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Label>Senha de Administrador</Form.Label>
          <Form.InputPass
            name="password"
            placeholder="Digite a senha"
            autoComplete="off"
            autoFocus
          />
        </Form.Field>
      </Form.Root>
    </Modal>
  );
}
