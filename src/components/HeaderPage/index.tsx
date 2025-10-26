import { Plus, SearchIcon, XIcon, Settings, LucideIcon } from "lucide-react";
import { Button } from "../Button";
import { Form } from "../Forms";
import { useHeaderPage } from "./use-header-page";
import { FilterData } from "@/models/filter";
import { useNavigate } from "react-router-dom";

interface HeaderPageProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  onSearch?: (data: FilterData) => void;
  onAdd?: () => void;
  addButtonLabel?: string;
  showSettings?: boolean;
}

export function HeaderPage({ 
  icon: Icon, 
  title, 
  description, 
  onSearch, 
  onAdd, 
  addButtonLabel = "Novo Registro",
  showSettings = false 
}: HeaderPageProps) {
  const { form, onSubmit, debouncedFilter, clearSearch } = useHeaderPage({ onSearch: onSearch });
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg py-8 px-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-8" />}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto lg:min-w-[480px]">
          {onSearch && (
            <Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
              <Form.Input
                name="term"
                placeholder="Pesquisar código, lote, produto..."
                leftIcon={<SearchIcon size={18} className="text-white"/>}
                rightIcon={(form.watch("term")?.length ?? 0) >= 1 &&
                  <Button
                    type="button"
                    onClick={clearSearch}
                    variant="ghost"
                    className="px-0"
                  >
                    <XIcon size={18} strokeWidth={4} className="text-white/80" />
                  </Button>
                }
                className="bg-transparent text-white placeholder:text-white/50"
                containerClassName="bg-white/20 border-white/20 focus-within:ring-blue-400 sm:w-72"
                onChange={debouncedFilter}
              />
            </Form.Root>
          )}

          {onAdd && (
            <Button
              onClick={onAdd}
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Plus className="size-5" />
              {addButtonLabel}
            </Button>
          )}

          {showSettings && (
            <Button
              onClick={() => navigate("/settings/responsible")}
              variant="secondary"
              className="bg-white/20 px-3 text-white hover:bg-white/30 border border-white/30"
            >
              <Settings className="size-5" />
              <span className="sm:hidden">Configurações</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
