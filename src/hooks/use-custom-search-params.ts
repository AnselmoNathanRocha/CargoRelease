import { removeEmptyProperties, toDeep } from "@/utils/functions";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (params: Record<string, any>) => {
      const newParams = removeEmptyProperties(params);

      setSearchParams(toDeep(newParams));
    },
    [setSearchParams],
  );

  return [searchParams, updateSearchParams] as const;
}