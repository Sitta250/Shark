import { cn } from "@/lib/utils"

type Props = {
  title: string
  label?: string
  children: React.ReactNode
  className?: string
}

export function SectionCard({ title, label, children, className }: Props) {
  return (
    <div className={cn("bg-card rounded-lg p-6 space-y-4", className)}>
      <div className="space-y-0.5">
        {label && (
          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
        )}
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function LabeledText({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}
