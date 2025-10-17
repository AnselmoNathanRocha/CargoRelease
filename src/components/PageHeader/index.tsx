import { useState } from "react";
import { Search, Plus } from "lucide-react";

interface PageHeaderProps {
  onSearch?: (value: string) => void;
  onAdd?: () => void;
}

export function PageHeader({ onSearch, onAdd }: PageHeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  }

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg py-8 px-10 mb-6">
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
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200 w-4 h-4" />
            <input
              type="text"
              placeholder="Pesquisar lote, produto..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/15 border border-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
            />
          </div>

          <button
            onClick={onAdd}
            className="flex items-center justify-center gap-2 bg-white text-blue-700 font-medium px-5 py-2.5 rounded-lg hover:bg-blue-50 active:scale-[0.98] transition-all shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Novo Registro
          </button>
        </div>
      </div>
    </header>
  );
}
