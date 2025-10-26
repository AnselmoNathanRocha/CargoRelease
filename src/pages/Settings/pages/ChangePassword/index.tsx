import { ClockIcon, Lock } from "lucide-react";
import { Button } from "@/components/Button";
import { Form } from "@/components/Forms";
import { SettingsSection } from "../../components/SettingsSection";
import { useChangePassword } from "./use-change-password";

export function ChangePassword() {
  const { form, onSubmit, lastUpdatedAt } = useChangePassword();

  return (
    <SettingsSection
      icon={Lock}
      title="Alterar Senha do Sistema"
      description="Senha de alteração de dados"
    >
      <div className="w-full max-w-md h-14 px-4 rounded-md border border-blue-300 flex items-center text-sm text-muted-foreground gap-2 bg-blue-50">
  <ClockIcon strokeWidth={3} className="size-4.5 text-blue-500 flex-shrink-0" />
  {lastUpdatedAt ? (
    <p>
      Última atualização em: <span className="font-bold">{lastUpdatedAt}</span>
    </p>
  ) : (
    <p className="whitespace-nowrap">Carregando data da última atualização...</p>
  )}
</div>


      <Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 max-w-md mt-4">
          <Form.Field>
            <Form.Label htmlFor="currentPassword">Senha Atual</Form.Label>
            <Form.InputPass
              name="currentPassword"
              placeholder="Digite a senha atual"
            />
            <Form.ErrorMessage field="currentPassword" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="newPassword">Nova Senha</Form.Label>
            <Form.InputPass
              name="newPassword"
              placeholder="Digite a nova senha"
            />
            <Form.ErrorMessage field="newPassword" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="confirmNewPassword">
              Confirmar Senha
            </Form.Label>
            <Form.InputPass
              name="confirmNewPassword"
              placeholder="Confirme a nova senha"
            />
            <Form.ErrorMessage field="confirmNewPassword" />
          </Form.Field>

          <Button>
            <Lock className="size-5" />
            Alterar Senha
          </Button>
        </div>
      </Form.Root>
    </SettingsSection>
  );
}

