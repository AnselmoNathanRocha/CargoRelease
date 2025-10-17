import { ComponentProps } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

export interface RootProps<T extends FieldValues>
  extends ComponentProps<"form"> {
  form: UseFormReturn<T>;
  useDefaultStyle?: boolean;
}

export function Root<T extends FieldValues>({ form, ...props }: RootProps<T>) {
  return (
    <FormProvider {...form}>
      <form noValidate autoComplete="off" {...props} />
    </FormProvider>
  );
}