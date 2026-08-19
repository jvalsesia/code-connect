import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/cn'

export type ButtonVariant = 'primary' | 'ghost'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  /** Bloqueia o botão e troca o rótulo por um texto de progresso. */
  isLoading?: boolean
  loadingLabel?: string
  /** Elemento renderizado à direita do rótulo (a seta do design, por exemplo). */
  iconRight?: ReactNode
  children: ReactNode
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-brand-contrast hover:bg-brand-hover focus-visible:outline-brand',
  ghost:
    'bg-transparent text-content hover:bg-white/5 focus-visible:outline-content',
}

export function Button({
  variant = 'primary',
  isLoading = false,
  loadingLabel = 'Carregando…',
  iconRight,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        'inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md',
        'text-base font-semibold transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? loadingLabel : children}
      {!isLoading && iconRight ? (
        <span aria-hidden="true" className="text-lg leading-none">
          {iconRight}
        </span>
      ) : null}
    </button>
  )
}
