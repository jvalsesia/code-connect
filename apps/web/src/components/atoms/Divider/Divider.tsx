import { cn } from '../../../lib/cn'

export interface DividerProps {
  /** Texto centralizado entre as duas linhas. */
  label?: string
  className?: string
}

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn('h-px border-0 bg-content-muted/40', className)} />
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span aria-hidden="true" className="h-px flex-1 bg-content-muted/40" />
      <span className="text-sm text-content-muted">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-content-muted/40" />
    </div>
  )
}
