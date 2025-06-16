import { cn } from "@/lib/utils";
import { formatISO9075 } from "date-fns";
import { ComponentProps } from "react";

interface ChatboxProps extends ComponentProps<"div"> {
  date?: Date;
}

export function Chatbox({ className, children, date, ...props }: ChatboxProps) {
  return (
    <div
      className={cn(
        "bg-primary px-4 py-3 rounded-lg text-primary-foreground flex items-center justify-between gap-2 break-all text-sm",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      <div className="text-xs text-muted-foreground">
        {date && formatISO9075(date)}
      </div>
    </div>
  );
}
