import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export interface SocialLoginButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Caminho do ícone do provedor (o rótulo já vem embutido na arte). */
  iconSrc: string
  /** Nome acessível do botão, ex.: "Entrar com Github". */
  label: string
}

export function SocialLoginButton({
  iconSrc,
  label,
  className,
  type = 'button',
  ...props
}: SocialLoginButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-md p-2',
        'transition-colors hover:bg-white/5',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        className,
      )}
      {...props}
    >
      <img src={iconSrc} alt={label} className="h-14 w-auto object-contain" />
    </button>
  )
}
