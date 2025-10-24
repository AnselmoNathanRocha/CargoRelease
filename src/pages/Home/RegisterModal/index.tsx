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
			onClose={onCancel}
			loading={isLoading}
		>
			<div>
				<Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Group>
						<Form.Field>
							<Form.Label>Data</Form.Label>
							<Form.Input
								name="date"
								type="date"
								placeholder="Digite a data"
							/>
						</Form.Field>

						<Form.Field>
							<Form.Label>Horas</Form.Label>
							<Form.Input
								name="hours"
								type="time"
								placeholder="Digite a hora"
							/>
						</Form.Field>

						<Form.Field>
							<Form.Label>Produto</Form.Label>
							<Form.Input
								name="productDescription"
								placeholder="Digite o produto"
							/>
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field>
							<Form.Label>Código</Form.Label>
							<Form.Input
								name="productCode"
								placeholder="Digite o código do produto"
							/>
						</Form.Field>

						<Form.Field>
							<Form.Label>OP</Form.Label>
							<Form.Input
								name="opNumber"
								placeholder="Digite o Nº da OP"
								minLength={5}
								maxLength={5}
							/>
						</Form.Field>

						<Form.Field>
							<Form.Label>Lote</Form.Label>
							<Form.Input
								name="batch"
								placeholder="Digite o lote"
							/>
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field>
							<Form.Label>Viscosidade</Form.Label>
							<Form.Input
								name="viscosity"
								inputMode="decimal"
								placeholder="Digite o valor da viscosidade"
							/>
						</Form.Field>

						<Form.Field>
							<Form.Label>PH</Form.Label>
							<Form.Input
								name="hydrogenPotential"
								inputMode="decimal"
								placeholder="Digite o valor da viscosidade"
							/>
						</Form.Field>

						<Form.Field>
							<Form.Label>Densidade</Form.Label>
							<Form.Input
								name="density"
								placeholder="Digite o produto"
							/>
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field>
							<Form.Label>Ativo</Form.Label>
							<Form.Input
								name="active"
								inputMode="decimal"
								placeholder="Digite o valor da viscosidade"
							/>
						</Form.Field>

						<Form.Field>
							<Form.Label>Responsável</Form.Label>
							<Form.Input
								name="responsibleId"
								type="time"
								placeholder="Digite a hora"
							/>
						</Form.Field>
					</Form.Group>

					<Form.Field>
							<Form.Label>Observações</Form.Label>
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