import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type ChatboxProps = ComponentProps<"div">;

export function Chatbox({ className, ...props }: ChatboxProps) {
  return (
    <div
      className={cn(
        "bg-primary px-4 py-3 rounded-lg text-primary-foreground",
        className
      )}
      {...props}
    />
  );
}
