import { Controller, useFormContext } from "react-hook-form";

import { simpleSearch } from "@/utils/functions";
import { useMemo, useState } from "react";
import { MultiSelect, MultiSelectProps } from "../ui/multiselect";

type AutoCompleteProps = Omit<MultiSelectProps, "onChange" | "selected">;

export function AutoComplete({
  name,
  options,
  onFilter,
  ...props
}: AutoCompleteProps) {
  const { control } = useFormContext();

  const [searchTerm, setSearchTerm] = useState("");

  const selectOptions = useMemo(
    () => options.filter(({ name }) => simpleSearch(name, searchTerm)),
    [options, searchTerm],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <MultiSelect
          name={name}
          options={selectOptions}
          selected={field.value}
          onChange={field.onChange}
          onFilter={onFilter ?? setSearchTerm}
          {...props}
        />
      )}
    />
  );
}