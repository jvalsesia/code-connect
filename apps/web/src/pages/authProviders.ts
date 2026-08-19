import type { SocialProvider } from '../components/molecules'

/** Provedores sociais compartilhados entre login e cadastro. */
export const SOCIAL_PROVIDERS: SocialProvider[] = [
  { id: 'github', iconSrc: '/github.png', label: 'Entrar com Github' },
  { id: 'gmail', iconSrc: '/gmail.png', label: 'Entrar com Gmail' },
]

export const LOGIN_BANNER = {
  src: '/banner-login.png',
  alt: 'Desenvolvedora sorrindo em frente a um painel de código da Code Connect',
}
