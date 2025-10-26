import { Users, Plus, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/Button";
import { Form } from "@/components/Forms";
import { SettingsSection } from "../../components/SettingsSection";
import { ResponsibleItem } from "../../components/ResponsibleItem";
import { useResponsiblePage } from "./use-responsible-page";
import { Responsible as ResponsibleType } from "@/models/responsible";
import { ConfirmWithPasswordModal } from "@/components/ConfirmWithPasswordModal";

export function Responsible() {
  const { 
    form, 
    responsibles, 
    isLoadingCreateResponsibles, 
    isLoadingDeleteResponsible, 
    deletingId, 
    isUnlocked,
    confirmWithPasswordModalRef, 
    handleUnlock,
    handleLock,
    onUnlockConfirm,
    handleCreate,
    handleDelete,
  } = useResponsiblePage();

  return (
    <SettingsSection
      icon={Users}
      title="Gerenciar Responsáveis"
      description="Cadastre e gerencie os responsáveis pelos registros"
    >
      <div className="space-y-6">
        {/* Botão de Lock/Unlock */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            {isUnlocked ? (
              <Unlock className="size-5 text-green-600" />
            ) : (
              <Lock className="size-5 text-gray-500" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isUnlocked ? "Edição Desbloqueada" : "Edição Bloqueada"}
              </p>
              <p className="text-xs text-gray-600">
                {isUnlocked 
                  ? "Você pode adicionar e remover responsáveis (expira em 5 min)" 
                  : "Desbloqueie para editar responsáveis"}
              </p>
            </div>
          </div>
          
          {isUnlocked ? (
            <Button
              onClick={handleLock}
              variant="secondary"
              size="small"
              className="bg-gray-200 hover:bg-gray-300"
            >
              <Lock className="size-4" />
              Bloquear
            </Button>
          ) : (
            <Button
              onClick={handleUnlock}
              size="small"
              className="bg-blue-700 hover:bg-blue-800"
            >
              <Unlock className="size-4" />
              Desbloquear
            </Button>
          )}
        </div>

        {/* Formulário de Criação */}
        <Form.Root 
          form={form} 
          onSubmit={form.handleSubmit(handleCreate)}
        >
          <div className="flex gap-2">
            <div className="flex-1">
              <Form.Input
                name="name"
                placeholder="Digite o nome do responsável"
                disabled={!isUnlocked}
              />
            </div>
            <Button
              type="submit"
              isLoading={isLoadingCreateResponsibles}
              disabled={!isUnlocked}
              className="h-10 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="size-5" />
              <span className="hidden sm:block">Adicionar</span>
            </Button>
          </div>
        </Form.Root>

        {/* Lista de Responsáveis */}
        {responsibles.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Responsáveis cadastrados ({responsibles.length})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {responsibles.map((responsible: ResponsibleType) => (
                <ResponsibleItem
                  key={responsible.id}
                  id={responsible.id}
                  name={responsible.name}
                  onDelete={() => handleDelete(responsible.id)}
                  isLoading={isLoadingDeleteResponsible && deletingId === responsible.id}
                  disabled={!isUnlocked}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-300">
            Nenhum responsável cadastrado ainda
          </div>
        )}
      </div>

      <ConfirmWithPasswordModal
        ref={confirmWithPasswordModalRef}
        onConfirm={onUnlockConfirm}
      />
    </SettingsSection>
  );
}
