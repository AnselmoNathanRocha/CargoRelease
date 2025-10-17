import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterData, filterSchema } from "@/models/filter";

interface useHeaderPageProps {
	onSearch: (data: FilterData) => void;
}

export function useHeaderPage({ onSearch }: useHeaderPageProps) {
	const form = useForm<FilterData>({
    resolver: zodResolver(filterSchema),
  });
	
	return {
		form,
		onSubmit: (data: FilterData) => onSearch(data),
	}
}