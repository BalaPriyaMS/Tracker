import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex bg-muted file:bg-transparent disabled:opacity-50 px-3 py-1 border border-transparent focus:border-primary/30 file:border-0 rounded-md focus-visible:outline-none w-full h-9 font-medium file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base transition-colors disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Input };
