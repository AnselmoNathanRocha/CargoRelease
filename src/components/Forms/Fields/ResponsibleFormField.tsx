import { Form } from "..";
import { Responsible } from "@/models/responsible";
import { useResponsibles } from "@/hooks/use-responsibles";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  disabled?: boolean;
  selected?: Responsible;
  label?: string;
  name?: string;
  multiple?: boolean;
}

export function ResponsibleFormField({
  disabled,
  label = "Responsável",
  name = "responsibleId",
  multiple = false,
}: Props) {
  const { responsibles, isLoadingResponsibles } = useResponsibles({
    name: ""
  });

  return (
    <Form.Field>
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.AutoComplete
        name={name}
        placeholder="Selecione um acessório"
        options={responsibles}
        loading={isLoadingResponsibles}
        disabled={disabled}
        multiple={multiple}
        emptyComponent={
          <div className="p-2 flex flex-col items-center gap-2">
            Nenhum responsável encontrado. Deseja criar?
            <Link
              to="settings/responsible"
              className="w-20 h-9 flex justify-center items-center gap-1 rounded-md shadow-md text-white bg-blue-700 hover:opacity-90 transition-all"
            >
              <PlusIcon size={18} />
              Criar
            </Link>
          </div>
        }
      />
      <Form.ErrorMessage field={name} />
    </Form.Field>
  );
}