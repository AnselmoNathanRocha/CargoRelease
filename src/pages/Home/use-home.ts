import { useDebounce } from "@/hooks/use-debounce";
import { FilterData } from "@/models/filter";
import { Page, PageWithoutContent } from "@/models/pagination"
import { Register } from "@/models/register";
import { useRef, useState } from "react";
import { RegsiterModalRef } from "./RegisterModal/use-register-modal";

export function useHome() {
  const [loading] = useState<boolean>(false);
  const registerModalRef = useRef<RegsiterModalRef>(null);

  const dataMock: Page<Register> = {
    content: [
      {
        id: "1",
        date: "2025-10-14",
        productDescription: "Shampoo Hidratante 500ml",
        productCode: "SH-500H",
        opNumber: 23145,
        batch: "L2310A",
        coa: true,
        viscosity: 8500,
        hydrogenPotential: 6.5,
        density: 1.02,
        active: null,
        hours: "08:30",
        responsibleId: "Marcos Silva",
      },
      {
        id: "2",
        date: "2025-10-14",
        productDescription: "Condicionador Nutritivo 500ml",
        productCode: "CN-500N",
        opNumber: 23146,
        batch: "L2310B",
        coa: false,
        viscosity: 9500,
        hydrogenPotential: 4.8,
        density: 0.98,
        active: 2.3,
        hours: "09:10",
        responsibleId: "Ana Pereira",
      },
      {
        id: "3",
        date: "2025-10-14",
        productDescription: "Sabonete Líquido Neutro 1L",
        productCode: "SL-1L",
        opNumber: 23147,
        batch: "L2310C",
        coa: true,
        viscosity: 5200,
        hydrogenPotential: 7.0,
        density: 1.01,
        active: null,
        hours: "10:00",
        responsibleId: "Bruno Costa",
      },
      {
        id: "4",
        date: "2025-10-14",
        productDescription: "Creme Corporal Hidratante 200g",
        productCode: "CC-200H",
        opNumber: 23148,
        batch: "L2310D",
        coa: false,
        viscosity: 12000,
        hydrogenPotential: 5.6,
        density: 0.95,
        active: null,
        hours: "11:15",
        responsibleId: "Fernanda Lima",
      },
      {
        id: "5",
        date: "2025-10-14",
        productDescription: "Gel Capilar Fixador 300g",
        productCode: "GC-300F",
        opNumber: 23149,
        batch: "L2310E",
        coa: true,
        viscosity: null,
        hydrogenPotential: 6.8,
        density: 1.03,
        active: 4.1,
        hours: "12:45",
        responsibleId: "Ricardo Mendes",
      }
    ],
    page: 0,
    size: 10,
    totalElements: 5,
    totalPages: 1,
  }

  const handleSearch = (data: FilterData) => {
    console.log("Search: ", data);
  };
  
  const handleSearchDebounced = useDebounce(handleSearch, 1000)

  return {
    dataMock,
    loading,
    paginationProps: dataMock as PageWithoutContent | undefined,
    handleSearch: handleSearchDebounced,
    handleClickAdd: () => registerModalRef.current?.open(),
    handleClickEdit: (register: Register) =>
      registerModalRef.current?.open(register),
    registerModalRef,
  }
}