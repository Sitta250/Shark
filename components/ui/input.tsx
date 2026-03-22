import * as React from "react"
import { cn } from "@/lib/utils"

/* shark_v1: surface_container_lowest bg, ghost border (20% opacity outline_variant).
   Focus: border transitions to primary at 100% opacity, no ring box-shadow. */

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md bg-card px-3 py-2 text-sm",
          "border border-outline-variant/20",
          "placeholder:text-muted-foreground",
          "transition-colors",
          "focus-visible:outline-none focus-visible:border-ring focus-visible:border-opacity-100",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
