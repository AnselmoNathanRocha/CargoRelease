import { KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { Form } from "@/components/Forms";
import { SettingsSection } from "../../components/SettingsSection";
import { useRecoverPassword } from "./use-recover-password";

export function RecoverPassword() {
  const { emailForm, onUpdateEmail, passwordForm, onRecoverPassword } =
    useRecoverPassword();

  return (
    <div className="space-y-8">
      <SettingsSection
        icon={Mail}
        title="Alterar E-mail de Recuperação"
        description="E-mail para recuperar a senha do sistema"
      >
        <Form.Root
          form={emailForm}
          onSubmit={emailForm.handleSubmit(onUpdateEmail)}
        >
          <div className="space-y-4 max-w-md">
            <Form.Field>
              <Form.Label htmlFor="email">E-mail de Recuperação</Form.Label>
              <Form.Input
                name="email"
                placeholder="Digite o e-mail de recuperação"
              />
              <Form.ErrorMessage field="email" />
            </Form.Field>

            <Button>
              <Mail className="size-5" />
              Alterar E-mail
            </Button>
          </div>
        </Form.Root>
      </SettingsSection>

      <SettingsSection
        icon={KeyRound}
        title="Recuperar Senha do Sistema"
        description="Redefinir senha do sistema"
      >
        <Form.Root
          form={passwordForm}
          onSubmit={passwordForm.handleSubmit(onRecoverPassword)}
        >
          <div className="space-y-4 max-w-md">
            <Form.Field>
              <Form.Label htmlFor="securityCode">Código de Segurança</Form.Label>
              <Form.Input name="securityCode" placeholder="Digite o código" />
              <Form.ErrorMessage field="securityCode" />
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
              <KeyRound className="size-5" />
              Recuperar Senha
            </Button>
          </div>
        </Form.Root>
      </SettingsSection>
    </div>
  );
}
