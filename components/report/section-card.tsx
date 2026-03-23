import { cn } from "@/lib/utils"

type Props = {
  title: string
  label?: string
  children: React.ReactNode
  className?: string
  hero?: boolean
}

export function SectionCard({ title, label, children, className, hero }: Props) {
  return (
    <div className={cn(
      "bg-card rounded-xl space-y-4",
      hero ? "p-7" : "p-6",
      className
    )}>
      <div className="space-y-1">
        {label && (
          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
        )}
        <h3 className={cn(
          "font-semibold tracking-tight",
          hero ? "text-lg" : "text-base"
        )}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function LabeledText({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  )
}
