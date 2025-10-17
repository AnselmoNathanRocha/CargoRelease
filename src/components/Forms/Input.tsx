import {
  ComponentProps,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/utils/cn";
import { MaskType, masks } from "@/utils/masks";

export interface InputProps extends Omit<ComponentProps<"input">, "onInput"> {
  mask?: MaskType;
  name: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  permitNegativeValues?: boolean;
  containerClassName?: string;
  formContextEnabled?: boolean;
}

export function Input({
  id,
  name,
  mask,
  leftIcon,
  rightIcon,
  permitNegativeValues,
  className,
  containerClassName,
  hidden,
  onChange,
  formContextEnabled = true,
  ...props
}: InputProps) {
  const { register, getFieldState, getValues, setValue } = useFormContext();

  const fieldState = getFieldState(name);

  const field = {
    ...(formContextEnabled
      ? register?.(name, {
          valueAsNumber: props.type === "number" ? true : undefined,
        })
      : {}),
  };

  const additionalProps: InputHTMLAttributes<HTMLInputElement> = {};

  if (props.type === "number" && !permitNegativeValues) {
    additionalProps.min = "0";
  }

  const handleInputMask = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      if (mask && typeof masks[mask] === "function") {
        masks[mask](event);
      }
    },
    [mask],
  );

  useEffect(() => {
    const currentValue = getValues(name) ?? "";
    if (!mask || currentValue === undefined) return;

    const maskedValue = masks[mask](String(currentValue));
    setValue(name, maskedValue, { shouldDirty: false, shouldTouch: false });
  }, [mask, name, setValue, getValues]);

  return (
    <div
      data-invalid={fieldState.invalid}
      className={cn(
        "my-0.5 flex h-12 w-full items-center gap-2 rounded-sm border border-zinc-400 bg-white px-3 py-2 text-zinc-700 focus-within:ring-2 focus-within:ring-zinc-400 focus-within:ring-offset-2 data-[invalid=true]:ring-2 data-[invalid=true]:ring-red-400",
        {
          "bg-zinc-200 opacity-80": props.disabled,
          hidden: hidden,
        },
        containerClassName,
      )}
    >
      {leftIcon && <div className="flex-shrink-0">{leftIcon}</div>}

      <input
        id={id ?? name}
        onInput={handleInputMask}
        className={cn(
          "w-full flex-1 overflow-hidden bg-transparent font-medium text-dark placeholder:text-base placeholder:font-normal placeholder:text-gray-350 placeholder:normal-case focus:outline-none disabled:text-gray-500",
          className,
        )}
        {...field}
        onChange={(event) => {
          onChange?.(event);
          void field.onChange?.(event);
        }}
        {...props}
        {...additionalProps}
      />

      {rightIcon && <div className="flex-shrink-0">{rightIcon}</div>}
    </div>
  );
}