import { Divider } from '../../atoms/Divider'
import { SocialLoginButton } from '../SocialLoginButton'
import { cn } from '../../../lib/cn'

export interface SocialProvider {
  id: string
  iconSrc: string
  label: string
}

export interface SocialLoginGroupProps {
  label: string
  providers: SocialProvider[]
  onSelect?: (providerId: string) => void
  disabled?: boolean
  className?: string
}

export function SocialLoginGroup({
  label,
  providers,
  onSelect,
  disabled,
  className,
}: SocialLoginGroupProps) {
  return (
    <section aria-label={label} className={cn('flex flex-col gap-4', className)}>
      <Divider label={label} />
      <ul className="flex items-start justify-center gap-6">
        {providers.map((provider) => (
          <li key={provider.id}>
            <SocialLoginButton
              iconSrc={provider.iconSrc}
              label={provider.label}
              disabled={disabled}
              onClick={() => onSelect?.(provider.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
