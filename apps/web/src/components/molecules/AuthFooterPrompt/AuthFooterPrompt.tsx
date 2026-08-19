import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'

export interface AuthFooterPromptProps {
  question: string
  /** Link de ação — montado por quem conhece o roteamento (a página). */
  children: ReactNode
  className?: string
}

export function AuthFooterPrompt({
  question,
  children,
  className,
}: AuthFooterPromptProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
      <p className="text-base text-content">{question}</p>
      {children}
    </div>
  )
}
