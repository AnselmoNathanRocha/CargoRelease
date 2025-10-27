import { Table, TableHeader } from "@/components/Table";
import { SquareCheckBig, Pencil, Trash2, Ellipsis, PackageCheck } from "lucide-react";
import { useHome } from "./use-home";
import { cn } from "@/utils/cn";
import { Dropdown } from "@/components/Dropdown";
import { HeaderPage } from "@/components/HeaderPage";
import { Register } from "@/models/register";
import { RegisterModal } from "./RegisterModal";
import { ConfirmRegisterExclusionModal } from "./ConfirmRegisterExclusionModal";
import dayjs from "dayjs";
import { ConfirmWithPasswordModal } from "@/components/ConfirmWithPasswordModal";

export function Home() {
  const { 
    data, 
    updateFilter,
    loading, 
    paginationProps, 
    handleClickAdd, 
    openConfirmWithPasswordModal,
    registerModalRef, 
    confirmExclusionModalRef,
    confirmWithPasswordModalRef,
    onConfirm,
  } = useHome();

  const tableHeader: TableHeader<Register>[] = [
    { 
      label: "Data", 
      property: "date",
      customElement({ date }) {
        return dayjs(date).format("DD/MM/YYYY")
      },
    },
    { label: "Hora", property: "hours" },
    { label: "Produto", property: "productDescription" },
    { label: "Código", property: "productCode" },
    { label: "OP", property: "opNumber" },
    { label: "Lote", property: "batch" },
    {
      label: "COA",
      property: "coa",
      customElement: () => <SquareCheckBig className="size-5 text-green-600" />,
    },
    {
      label: "Viscosidade",
      property: "viscosity",
      customElement({ viscosity }) {
        return Number(viscosity) !== 0 ? viscosity : "--"
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
      label: "Responsável", 
      property: "responsible.name",
    },
    { 
      label: "Observações", 
      property: "notes",
      customElement({ notes }) {
        return notes?.trim() !== "" ? notes : "--"
      },
    },
    {
      label: "AÇÕES",
      property: "actions",
      columnClassName: cn("w-32 text-center"),
      customElement: (item: Register) => (
        <Dropdown
          trigger={<Ellipsis size={20} />}
          items={[
            {
              label: "Editar",
              icon: <Pencil />,
              routeOrAction: () => openConfirmWithPasswordModal(item, "EDIT"),
            },
            {
              label: "Excluir",
              icon: <Trash2 />,
              routeOrAction: () => openConfirmWithPasswordModal(item, "DELETE"),
            },
          ]}
        />
      ),
    },
  ];
  
  return (
    <div>
      <HeaderPage 
        icon={PackageCheck}
        title="Liberação de Carga"
        description="Registro das análises de lote e acompanhamento de produção"
        onSearch={(term) => updateFilter(term ?? "")} 
        onAdd={handleClickAdd}
        showSettings
      />

      <div className="mx-4 border border-gray-400 rounded-2xl shadow-md mt-4">
        <div className="px-6 py-3 flex justify-between items-center border-b border-gray-400 bg-blue-100 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-blue-700 tracking-wide">
            RQ .210 LIBERAÇÃO DE CARGA
          </h2>
          <span className="text-sm text-gray-600 font-medium">
            Relatório de Qualidade - {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>

        <Table
          data={data}
          pagination={paginationProps}
          onChangePage={(page) => updateFilter({ page })}
          loading={loading}
          headers={tableHeader}
        />
      </div>

      <RegisterModal ref={registerModalRef} />
      <ConfirmRegisterExclusionModal ref={confirmExclusionModalRef} />

      <ConfirmWithPasswordModal<Register>
        ref={confirmWithPasswordModalRef}
        onConfirm={onConfirm}
      />
    </div>
  );
}
