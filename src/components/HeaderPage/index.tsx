import { Plus, SearchIcon, XIcon } from "lucide-react";
import { Button } from "../Button";
import { Form } from "../Forms";
import { useHeaderPage } from "./use-header-page";
import { FilterData } from "@/models/filter";

interface HeaderPageProps {
  onSearch: (data: FilterData) => void;
  onAdd?: () => void;
}

export function HeaderPage({ onSearch, onAdd }: HeaderPageProps) {
  const { form, onSubmit } = useHeaderPage({onSearch});

  return (
    <header className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg py-8 px-10 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 max-w-[1800px] mx-auto">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Liberação de Carga
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Registro das análises de lote e acompanhamento de produção
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto lg:min-w-[480px]">
          <Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Input
              name="term"
              placeholder="Pesquisar lote, produto..."
              leftIcon={<SearchIcon size={18} className="text-white"/>}
              rightIcon={
                <Button
                  onClick={() => form.reset()}
                  variant="ghost"
                  className="px-0"
                >
                  <XIcon size={18} strokeWidth={4} className="text-white/80" />
                </Button>
              }
              className="bg-transparent text-white"
              containerClassName="bg-white/20 border-white/20 focus-within:ring-blue-400"
              onChange={(e) => {
                form.setValue('term', e.target.value);
                form.handleSubmit(onSubmit)();
              }}
            />
          </Form.Root>

          <Button
            onClick={onAdd}
            className="bg-white text-blue-700 hover:bg-blue-50"
          >
            <Plus className="size-5" />
            Novo Registro
          </Button>
        </div>
      </div>
    </header>
  );
}
