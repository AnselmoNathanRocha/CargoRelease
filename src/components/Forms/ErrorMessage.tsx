import { useFormContext } from "react-hook-form";

interface ErrorMessageProps {
  field: string;
  errorMessage?: string;
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const formContext = useFormContext() ?? {};

  const message = get(
    formContext?.formState?.errors,
    field,
  )?.message?.toString();

  if (!message) {
    return null;
  }

  return (
    <p className="mx-1 text-start text-xs font-normal text-red-400">
      {message}
    </p>
  );
}