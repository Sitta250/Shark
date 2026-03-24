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
      "bg-card rounded-xl ring-1 ring-outline-variant/20",
      hero ? "p-8" : "p-7",
      className
    )}>
      <div className={cn("space-y-1", hero ? "mb-6" : "mb-5")}>
        {label && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
        )}
        <h3 className={cn(
          "font-semibold tracking-tight",
          hero ? "text-xl" : "text-base"
        )}>
          {title}
        </h3>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function LabeledText({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{label}</p>
      <p className="text-sm font-medium leading-relaxed">{value}</p>
    </div>
  )
}
