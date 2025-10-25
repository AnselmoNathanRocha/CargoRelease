import { Modal } from "@/components/Modal";
import { RegsiterModalRef, useRegisterModal } from "./use-register-modal";
import { Ref } from "react";
import { Form } from "@/components/Forms";

interface Props {
  ref: Ref<RegsiterModalRef>;
}

export function RegisterModal ({ ref }: Props) {
	const { form, onSubmit, isOpen, onCancel, isLoading, } = useRegisterModal({ ref });
	
	return (
		<Modal
			title="Novo registro"
			isOpen={isOpen}
      confirmLabel="Criar registro"
      onConfirm={form.handleSubmit(onSubmit)}
			onClose={onCancel}
			loading={isLoading}
		>
			<div>
				<Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Group>
						<Form.Field>
							<Form.Label htmlFor="date">Data</Form.Label>
							<Form.Input
								name="date"
								type="date"
								placeholder="Digite a data"
							/>
              <Form.ErrorMessage field="date" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="hours">Horas</Form.Label>
							<Form.Input
								name="hours"
								type="time"
								placeholder="Digite a hora"
							/>
              <Form.ErrorMessage field="hours" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="productDescription">Produto</Form.Label>
							<Form.Input
								name="productDescription"
								placeholder="Digite a descrição do produto"
							/>
              <Form.ErrorMessage field="productDescription" />
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field>
							<Form.Label htmlFor="productCode">Código</Form.Label>
							<Form.Input
								name="productCode"
								placeholder="Digite o código do produto"
							/>
              <Form.ErrorMessage field="productCode" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="opNumber">OP</Form.Label>
							<Form.Input
								name="opNumber"
								placeholder="Digite o Nº da OP"
                inputMode="numeric"
								minLength={5}
								maxLength={5}
							/>
              <Form.ErrorMessage field="opNumber" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="batch">Lote</Form.Label>
							<Form.Input
								name="batch"
								placeholder="Digite o lote"
							/>
              <Form.ErrorMessage field="batch" />
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field>
							<Form.Label htmlFor="viscosity">Viscosidade</Form.Label>
							<Form.Input
								name="viscosity"
								inputMode="decimal"
                mask="onlyNumbersAndComma"
								placeholder="Digite o valor da viscosidade"
							/>
              <Form.ErrorMessage field="viscosity" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="hydrogenPotential">PH</Form.Label>
							<Form.Input
								name="hydrogenPotential"
								inputMode="decimal"
                mask="onlyNumbersAndComma"
								placeholder="Digite o valor da viscosidade"
							/>
              <Form.ErrorMessage field="hydrogenPotential" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="density">Densidade</Form.Label>
							<Form.Input
								name="density"
                inputMode="decimal"
                mask="onlyNumbersAndComma"
								placeholder="Digite o produto"
							/>
              <Form.ErrorMessage field="density" />
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field>
							<Form.Label htmlFor="active">Ativo</Form.Label>
							<Form.Input
								name="active"
								inputMode="decimal"
								placeholder="Digite o valor da viscosidade"
							/>
              <Form.ErrorMessage field="active" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="responsibleId">Responsável</Form.Label>
							<Form.AutoComplete
								name="responsibleId"
								options={[]}
								placeholder="Selecione o responsável"
							/>
              <Form.ErrorMessage field="responsibleId" />
						</Form.Field>
					</Form.Group>

					<Form.Field>
							<Form.Label htmlFor="notes">Observações</Form.Label>
							<Form.Textarea
								name="notes"
								placeholder="Digite aqui alguma observação (opcional)"
							/>
						</Form.Field>
				</Form.Root>
			</div>
		</Modal>
	)
}