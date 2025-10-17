import { useEffect } from "react";

interface Props {
  element?: HTMLElement | null;
  blocked: boolean;
}

export function useScrollBlocker({ element, blocked }: Props) {
  useEffect(() => {
    if (blocked) {
      element?.classList.add("overflow-hidden");
    } else {
      element?.classList.remove("overflow-hidden");
    }
  }, [element, blocked]);
}