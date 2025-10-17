import { Check, ChevronsUpDown, RefreshCcw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/utils/cn";
import { noOp } from "@/utils/functions";
import { Input } from "../Forms/Input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface MultiSelectOption {
  id: string | number;
  name: string;
}

export interface MultiSelectProps {
  name: string;
  options: MultiSelectOption[];
  disabled?: boolean;
  placeholder?: string;
  selected: (string | number) | (string | number)[] | null | undefined;
  onChange: (selected: string | number | (string | number)[] | null) => void;
  loading?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  onFilter?: (searchTerm: string) => void;
  filterDebounceTime?: number;
}

export function MultiSelect({
  name,
  options,
  disabled = false,
  placeholder,
  selected,
  onChange,
  loading = false,
  searchable = true,
  multiple = false,
  onFilter,
  filterDebounceTime = 500,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const isSelected = useCallback(
    (value: string | number) =>
      (Array.isArray(selected) && selected.includes(value)) ||
      String(selected) === String(value),
    [selected],
  );

  const handleSelect = useCallback(
    (value: string | number) => {
      if (multiple && Array.isArray(selected)) {
        const updatedSelected = selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value];
        onChange(updatedSelected);
      } else if (!multiple) {
        const newValue = isSelected(value) ? null : value;
        onChange(newValue);
        setOpen(false);
      }
    },
    [multiple, selected, onChange, isSelected],
  );

  const selectedLabels = useMemo(
    () =>
      multiple
        ? Array.isArray(selected)
          ? selected
              .map(
                (value) =>
                  options.find((option) => String(option.id) === String(value))
                    ?.name,
              )
              .filter(Boolean)
              .join(", ")
          : ""
        : (options.find((option) => String(option.id) === String(selected))
            ?.name ?? ""),
    [multiple, selected, options],
  );

  const debouncedOnFilter = useDebounce(onFilter ?? noOp, filterDebounceTime);

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="relative flex w-full items-center outline-0"
          >
            <Input
              name={name}
              className="w-full cursor-default justify-between pr-8 text-ellipsis"
              disabled={disabled || loading}
              readOnly={true}
              placeholder={loading ? "Carregando..." : placeholder}
              value={loading ? "" : selectedLabels}
              formContextEnabled={false}
            />

            {loading ? (
              <RefreshCcw className="absolute right-3 ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
            ) : (
              <ChevronsUpDown className="absolute right-3 ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-full rounded bg-white p-0"
          style={{ width: "var(--radix-popover-trigger-width)" }}
          align="start"
        >
          <Command shouldFilter={false}>
            {searchable && (
              <CommandInput
                onValueChange={debouncedOnFilter}
                placeholder="Digite para buscar"
              />
            )}

            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
              <CommandGroup>
                {options.map(({ id, name }) => (
                  <CommandItem
                    key={id}
                    value={name}
                    onSelect={() => handleSelect(id)}
                    className="text-sm data-[selected=true]:bg-red-main/15"
                  >
                    {name}

                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected(id) ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}