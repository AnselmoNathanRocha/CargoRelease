import { useEffect, useState } from "react";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "base";
};

const breakpoints: Breakpoint[] = ["base", "sm", "md", "lg", "xl", "2xl"];

const isBreakpointOrAbove = (current: Breakpoint, target: Breakpoint) => {
  return breakpoints.indexOf(current) >= breakpoints.indexOf(target);
};

export function useTailwindBreakpoint() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const currentBreakpoint = getCurrentBreakpoint(width);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    currentBreakpoint,
    base: isBreakpointOrAbove(currentBreakpoint, "base"),
    sm: isBreakpointOrAbove(currentBreakpoint, "sm"),
    md: isBreakpointOrAbove(currentBreakpoint, "md"),
    lg: isBreakpointOrAbove(currentBreakpoint, "lg"),
    xl: isBreakpointOrAbove(currentBreakpoint, "xl"),
    "2xl": isBreakpointOrAbove(currentBreakpoint, "2xl"),
  };
}