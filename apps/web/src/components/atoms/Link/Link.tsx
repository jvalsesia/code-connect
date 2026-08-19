import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '../../../lib/cn'

export type LinkVariant = 'default' | 'accent'

type LinkOwnProps<T extends ElementType> = {
  /**
   * Componente usado na renderização. O átomo não conhece roteamento: quem
   * precisa navegar passa o `Link` do router por aqui.
   */
  as?: T
  variant?: LinkVariant
  className?: string
}

export type LinkProps<T extends ElementType = 'a'> = LinkOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof LinkOwnProps<T>>

const VARIANTS: Record<LinkVariant, string> = {
  default: 'text-content underline underline-offset-4 hover:text-white',
  accent: 'text-brand font-semibold hover:text-brand-hover',
}

export function Link<T extends ElementType = 'a'>({
  as,
  variant = 'default',
  className,
  ...props
}: LinkProps<T>) {
  const Component = (as ?? 'a') as ElementType

  return (
    <Component
      className={cn(
        'cursor-pointer rounded-sm text-sm transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  )
}
