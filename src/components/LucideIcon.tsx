import { onlyFirstLetterCapitalized } from "@/utils/functions";
import * as LucideIcons from "lucide-react";

export type LucideIconName = Lowercase<keyof typeof LucideIcons>;

interface IconProps {
  name: LucideIconName;
  size?: number;
  className?: string;
}

export function LucideIcon({
  name,
  size = 20,
  className,
}: IconProps) {
  const Icon = (LucideIcons as any)[onlyFirstLetterCapitalized(name)];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}