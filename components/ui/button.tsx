import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /* shark_v1 Primary: CTA gradient, xl rounding, machined feel */
        default:
          "bg-cta text-white rounded-xl hover:brightness-110 active:brightness-95 shadow-ambient",
        /* shark_v1 Secondary: surface_container_high bg, no border */
        secondary:
          "bg-surface-high text-foreground rounded-lg hover:bg-surface-highest",
        /* shark_v1 Tertiary / ghost: text only in primary color */
        ghost:
          "text-secondary hover:bg-surface-low rounded-lg",
        /* Destructive */
        destructive:
          "bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90",
        /* Outline with ghost border */
        outline:
          "border-ghost bg-transparent text-foreground rounded-lg hover:bg-surface-low",
        link:
          "text-secondary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
