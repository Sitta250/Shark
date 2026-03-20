import { cn } from "@/lib/utils"

type PageContainerProps = {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("px-6 py-6 max-w-5xl w-full mx-auto", className)}>
      {children}
    </div>
  )
}
