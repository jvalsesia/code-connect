import { cn } from '../../../lib/cn'

export interface AuthHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function AuthHeading({ title, subtitle, className }: AuthHeadingProps) {
  return (
    <header className={cn('flex flex-col gap-4', className)}>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {subtitle ? <p className="text-lg text-content">{subtitle}</p> : null}
    </header>
  )
}
