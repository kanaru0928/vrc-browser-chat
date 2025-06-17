"use client";

import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { CheckCircle2, CircleX, LoaderCircle, RefreshCcw } from "lucide-react";
import useSWR from "swr";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function Status() {
  const { error, isLoading, mutate } = useSWR("/api", fetcher);

  return (
    <div>
      <Alert
        className={cn(
          "flex justify-between items-center",
          isLoading
            ? "text-muted-foreground"
            : error
            ? "text-destructive"
            : "text-emerald-300 "
        )}
      >
        <div className="flex items-center gap-2">
          {isLoading ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : error ? (
            <CircleX size={16} />
          ) : (
            <CheckCircle2 size={16} />
          )}
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span className="text-sm">
              {error ? "Server is down" : "Server is up"}
            </span>
          )}
        </div>
        <div>
          <Button size="icon" disabled={isLoading} onClick={() => mutate()}>
            <RefreshCcw size={16} />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
