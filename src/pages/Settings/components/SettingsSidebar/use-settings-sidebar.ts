import { KeyRound, Lock, LucideProps, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface MenuItem {
  label: string;
  icon: React.FC<LucideProps>;
  to: string;
}

const menuItems: MenuItem[] = [
  {
    icon: Users,
    label: "Responsáveis",
    to: "/settings/responsible",
  },
  {
    icon: Lock,
    label: "Alterar Senha",
    to: "/settings/change-password",
  },
  {
    icon: KeyRound,
    label: "Recuperar Senha",
    to: "/settings/recover-password",
  },
];

export function useSettingsSidebar() {
  const location = useLocation();
  const buttonRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const [, buttonRef] =
      Object.entries(buttonRefs.current).find(([key]) =>
        location.pathname.endsWith(key),
      ) ?? [];

    buttonRef?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  }, [location.pathname]);

  return { buttonRefs, menuItems };
}