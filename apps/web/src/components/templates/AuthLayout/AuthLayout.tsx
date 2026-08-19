import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'

export interface AuthLayoutProps {
  /** Ilustração da coluna esquerda — muda entre login e cadastro. */
  banner: { src: string; alt: string }
  children: ReactNode
  className?: string
}

/**
 * Base visual das telas de autenticação: cartão escuro centralizado com a
 * ilustração à esquerda e o conteúdo (título, formulário, rodapé) à direita.
 * Login e cadastro compartilham este template — só trocam banner e conteúdo.
 */
export function AuthLayout({ banner, children, className }: AuthLayoutProps) {
  return (
    <main
      className={cn(
        'flex min-h-screen items-center justify-center bg-background p-4',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-full max-w-[1000px] flex-col gap-8 rounded-card bg-surface p-6',
          'md:flex-row md:items-stretch md:gap-0 md:p-14',
        )}
      >
        <div className="hidden md:block md:w-[407px] md:shrink-0">
          <img
            src={banner.src}
            alt={banner.alt}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-[318px] flex-col gap-6">{children}</div>
        </div>
      </div>
    </main>
  )
}
