import { PageWithoutContent } from "@/models/pagination"
import { Register, RegisterFilter } from "@/models/register";
import { registerService } from "@/services/register-service";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { RegsiterModalRef } from "./RegisterModal/use-register-modal";
import { ConfirmRegisterExclusionModalRef } from "./ConfirmRegisterExclusionModal/use-confirm-register-exclusion-modal";
import { getNumberOrDefault } from "@/utils/functions";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { useCustomSearchParams } from "@/hooks/use-custom-search-params";
import { ConfirmActionType, ConfirmWithPasswordModalRef } from "@/components/ConfirmWithPasswordModal/use-confirm-with-password-modal";

function getFilter(searchParams: URLSearchParams): RegisterFilter {
  return {
    term: searchParams.get("term") ?? "",
    page: getNumberOrDefault(searchParams.get("page"), 0),
    size: getNumberOrDefault(searchParams.get("size"), DEFAULT_PAGE_SIZE),
  };
}

export function useHome() {
  const registerModalRef = useRef<RegsiterModalRef>(null);
  const confirmExclusionModalRef =
    useRef<ConfirmRegisterExclusionModalRef>(null);
  const confirmWithPasswordModalRef = useRef<ConfirmWithPasswordModalRef>(null);
  
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const { data, isFetching } = useQuery({
    queryKey: ["registers", searchParams.toString()],
    queryFn: () => registerService.getAll(getFilter(searchParams)),
  });

  const openConfirmWithPasswordModal = (register: Register, type: ConfirmActionType) => {
    confirmWithPasswordModalRef?.current?.open(register, type);
  }
  
  return {
    data: data?.content ?? [],
    loading: isFetching,
    paginationProps: data as PageWithoutContent | undefined,
    handleClickAdd: () => registerModalRef.current?.open(),
    openConfirmWithPasswordModal,
    registerModalRef,
    confirmExclusionModalRef,
    updateFilter: (data: Partial<RegisterFilter>) => {
      const current = Object.fromEntries(searchParams.entries());
      const merged = { ...current, ...data };
      setSearchParams(merged);
    },
    confirmWithPasswordModalRef,
    onConfirm: (register?: Register, type?: ConfirmActionType) => 
      type === "EDIT" ? registerModalRef.current?.open(register) : 
      confirmExclusionModalRef.current?.open(register!),
  }
} 