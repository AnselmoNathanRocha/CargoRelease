import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

export interface TextAreaProps
  extends Omit<ComponentProps<"textarea">, "onChange"> {
  name: string;
  containerClassName?: string;
}

export function Textarea({
  id,
  name,
  className,
  containerClassName,
  rows = 3,
  ...props
}: TextAreaProps) {
  const { register, getFieldState } = useFormContext();

  const fieldState = getFieldState(name);

  return (
    <div
      data-invalid={fieldState.invalid}
      className={cn(
        "focus-within:ring-primary-900 my-1 flex min-h-14 w-full items-center gap-2 overflow-hidden rounded-md border border-zinc-400 bg-white px-3 py-2 text-zinc-700 focus-within:ring-2 focus-within:ring-offset-2 data-[invalid=true]:ring-2 data-[invalid=true]:ring-red-600",
        containerClassName,
        {
          hidden: props.hidden,
          "bg-zinc-200 opacity-80": props.disabled,
        },
      )}
    >
      <textarea
        id={id ?? name}
        rows={rows}
        className={cn(
          "custom-scrollbar max-w-full flex-1 resize-none bg-transparent font-medium text-dark placeholder:text-base placeholder:font-normal placeholder:text-gray-350 placeholder:normal-case focus:outline-none disabled:text-gray-500",
          className,
        )}
        {...register(name)}
        {...props}
      />
    </div>
  );
}