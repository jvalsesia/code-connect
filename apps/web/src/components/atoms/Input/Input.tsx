import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Aplica o contorno de erro e marca o campo como inválido para leitores de tela. */
  hasError?: boolean
}

export function Input({ hasError = false, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={hasError || undefined}
      className={cn(
        'h-11 w-full rounded-md border border-transparent bg-field px-3',
        'text-base text-content-inverse placeholder:text-field-placeholder',
        'transition-colors hover:bg-field-hover',
        'focus:outline-2 focus:outline-offset-2 focus:outline-brand',
        'disabled:cursor-not-allowed disabled:opacity-60',
        hasError && 'border-danger outline-danger focus:outline-danger',
        className,
      )}
      {...props}
    />
  )
}
