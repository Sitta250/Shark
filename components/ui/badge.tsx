import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* shark_v1: rectangular (sm rounding = 0.125rem), uppercase label-sm,
   tracking-wider — badges must feel technical, not decorative. */

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border-transparent px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-surface-high text-foreground",
        destructive:
          "bg-destructive/10 text-destructive",
        outline:
          "border border-outline-variant/30 text-muted-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
