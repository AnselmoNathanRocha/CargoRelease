import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterData, filterSchema } from "@/models/filter";
import { useCustomSearchParams } from "@/hooks/use-custom-search-params";
import { useDebounce } from "@/hooks/use-debounce";

interface useHeaderPageProps {
	onSearch?: (data: FilterData) => void;
}

export function useHeaderPage({ onSearch }: useHeaderPageProps) {
	const [searchParams, setSearchParams] = useCustomSearchParams();

	const form = useForm<FilterData>({
    resolver: zodResolver(filterSchema),
		defaultValues: {
      term: searchParams.get("term") ?? "",
    },
  });

	interface InputChangeEvent {
		target: {
			value: string;
		};
	}

	const debouncedFilter = useDebounce((e: InputChangeEvent): void => {
		form.setValue('term', e.target.value);
    form.handleSubmit(onSubmit)();
	}, 600);

	const onSubmit = (data: FilterData) => {
		onSearch!(data)
	}

	const clearSearch = () => {
		form.reset();
    const current = Object.fromEntries(searchParams.entries());
    delete current.term;
    setSearchParams(current);
  };
	
	return {
		form,
		onSubmit,
		clearSearch,
		debouncedFilter,
	}
}