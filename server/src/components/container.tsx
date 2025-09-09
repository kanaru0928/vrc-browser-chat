import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export function Container({
  children,
  className,
  asChild,
}: ContainerProps) {
  const ContainerElement = asChild ? Fragment : "div";

  return (
    <ContainerElement className={cn("bg-card border-2 border-accent p-5 rounded-xl shadow-xl shadow-card/60", className)}>
      {children}
    </ContainerElement>
  );
}