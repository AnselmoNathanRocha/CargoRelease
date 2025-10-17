import { ComponentProps } from "react";

import { cn } from "@/utils/cn";

interface Props extends ComponentProps<"section"> {
  title: string;
}

export function FormSection({ className, children, title, ...props }: Props) {
  return (
    <section className={cn("grid gap-1", className)} {...props}>
      <h2 className="font-medium text-zinc-500">{title}</h2>

      {children}
    </section>
  );
}