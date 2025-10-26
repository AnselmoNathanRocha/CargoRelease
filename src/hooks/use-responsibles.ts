import { ResponsibleFilter } from "@/models/responsible";
import { responsibleService } from "@/services/responsible-service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useResponsibles(
  initialFilter: ResponsibleFilter,
) {
  const [filter, setFilter] = useState(initialFilter);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["responsible", filter],
    queryFn: () => responsibleService.getAll(filter),
  });

  return {
    responsibles: data ?? [],
    isLoadingResponsibles: isFetching,
    refetchResponsibles: refetch,
    updateFilter: (newFilter: ResponsibleFilter) =>
      setFilter({ ...filter, ...newFilter }),
  };
}