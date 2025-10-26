import { Modal } from "@/components/Modal";
import { Ref } from "react";
import {
  ConfirmRegisterExclusionModalRef,
  useConfirmRegisterExclusionModal,
} from "./use-confirm-register-exclusion-modal";

interface Props {
  ref: Ref<ConfirmRegisterExclusionModalRef>;
}

export function ConfirmRegisterExclusionModal({ ref }: Props) {
  const { isOpen, closeModal, handleConfirmDelete, isPendingDelete } =
    useConfirmRegisterExclusionModal({ ref });

  return (
    <Modal
      title="Excluir registro"
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={handleConfirmDelete}
      loading={isPendingDelete}
      confirmButton="Sim, excluir."
    >
      Tem certeza que deseja remover este registro?
    </Modal>
  );
}