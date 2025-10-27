import { Modal } from "@/components/Modal";
import { RegsiterModalRef, useRegisterModal } from "./use-register-modal";
import { Ref } from "react";
import { Form } from "@/components/Forms";
import { ResponsibleFormField } from "@/components/Forms/Fields/ResponsibleFormField";
import { PlusIcon, SaveIcon } from "lucide-react";

interface Props {
  ref: Ref<RegsiterModalRef>;
}

export function RegisterModal ({ ref }: Props) {
	const { 
		form, 
		onSubmit, 
		isOpen, 
		onCancel, 
		isLoading, 
		isUpdate, 
	} = useRegisterModal({ ref });
	
	return (
		<Modal
			title="Novo registro"
			isOpen={isOpen}
      confirmButton={isUpdate ? 
				<>
					<SaveIcon size={18} />
					Salvar
				</> : 
				<>
					<PlusIcon size={18} />
					Criar registro
				</>
			}
      onConfirm={form.handleSubmit(onSubmit)}
			onClose={onCancel}
			loading={isLoading}
		>
			<div>
				<Form.Root form={form} onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
					<Form.Group>
						<Form.Field className="sm:max-w-36 max-w-full">
							<Form.Label htmlFor="date">Data</Form.Label>
							<Form.Input
								name="date"
								type="date"
								placeholder="Digite a data"
							/>
              <Form.ErrorMessage field="date" />
						</Form.Field>

						<Form.Field className="sm:max-w-26 max-w-full">
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
								mask="onlyUppercase"
								autoFocus
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
								type="number"
								name="opNumber"
								placeholder="Digite o Nº da OP"
                mask="fiveNumbers"
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
								type="number"
								name="hydrogenPotential"
								placeholder="Digite o valor da viscosidade"
							/>
              <Form.ErrorMessage field="hydrogenPotential" />
						</Form.Field>

						<Form.Field>
							<Form.Label htmlFor="density">Densidade</Form.Label>
							<Form.Input
                type="number"
								name="density"
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

						<ResponsibleFormField  />
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