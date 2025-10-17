import { Table, TableHeader } from "@/components/Table";
import { SquareCheckBig, SquareIcon, Clock, User, Calendar, Pencil, Trash2, Ellipsis } from "lucide-react";
import { HomeProps, useHome } from "./use-home";
import { cn } from "@/utils/cn";
import { Dropdown } from "@/components/Dropdown";
import { HeaderPage } from "@/components/HeaderPage";

export function Home() {
  const { dataMock, loading, paginationProps, handleAdd, handleSearch } = useHome();

  const tableHeader: TableHeader<HomeProps>[] = [
    { 
      label: "Data", 
      property: "date",
      customElement({ date }) {
        return (
          <div className="flex items-center gap-2 text-gray-900">
            <Calendar className="size-4 text-blue-400" />
            <span className="font-medium">{date}</span>
          </div>
        );
      },
    },
    { label: "Produto", property: "productDescription" },
    { label: "Código", property: "productCode" },
    { label: "OP", property: "opNumber" },
    { label: "Lote", property: "batch" },
    {
      label: "COA",
      property: "coa",
      customElement({ coa }) {
        return coa ? (
          <SquareCheckBig className="size-5 text-green-600" />
        ) : (
          <SquareIcon className="size-5 text-gray-400" />
        );
      },
    },
    {
      label: "Viscosidade",
      property: "viscosity",
      customElement({ viscosity }) {
        return viscosity ?? "--"
      },
    },
    { label: "PH", property: "hydrogenPotential" },
    { label: "Densidade", property: "density" },
    {
      label: "Ativo",
      property: "active",
      customElement({ active }) {
        return active ?? "--"
      },
    },
    {
      label: "Hora",
      property: "hours",
      customElement({ hours }) {
        return (
          <div className="flex items-center gap-1 text-gray-800">
            <Clock className="size-4 text-blue-500" />
            {hours}
          </div>
        );
      },
    },
    {
      label: "Responsável",
      property: "responsible",
      customElement({ responsible }) {
        return (
          <div className="flex items-center gap-2 text-gray-900">
            <User className="size-4 text-gray-600" />
            <span className="font-medium">{responsible}</span>
          </div>
        );
      },
    },
    {
      label: "AÇÕES",
      property: "actions",
      columnClassName: cn("w-32 text-center"),
      customElement: (item: HomeProps) => (
        <Dropdown
          trigger={<Ellipsis size={20} />}
          items={[
            {
              label: "Editar",
              icon: <Pencil />,
              routeOrAction: () => console.log(item),
            },
            {
              label: "Excluir",
              icon: <Trash2 />,
              routeOrAction: () => console.log(item),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <HeaderPage onSearch={handleSearch} onAdd={handleAdd} />

      <div className="mx-4 border border-gray-400 rounded-2xl shadow-md">
        <div className="px-6 py-3 flex justify-between items-center border-b border-gray-400 bg-blue-100 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-blue-700 tracking-wide">
            RQ .210 LIBERAÇÃO DE CARGA
          </h2>
          <span className="text-sm text-gray-600 font-medium">
            Relatório de Qualidade - {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>

        <Table
          data={dataMock.content}
          pagination={paginationProps}
          onChangePage={(page) => console.log(page)}
          loading={loading}
          headers={tableHeader}
        />
      </div>
    </div>
  );
}
