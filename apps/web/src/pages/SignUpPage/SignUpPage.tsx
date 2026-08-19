import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../../components/templates/AuthLayout'
import { AuthFooterPrompt, AuthHeading } from '../../components/molecules'
import { Link } from '../../components/atoms/Link'
import { LOGIN_BANNER } from '../authProviders'

/**
 * Stub do cadastro: prova que o `AuthLayout` se reaproveita sem alteração.
 * Falta trocar o banner pela arte da tela de cadastro e plugar o `SignUpForm`.
 */
export function SignUpPage() {
  return (
    <AuthLayout banner={LOGIN_BANNER}>
      <AuthHeading title="Cadastro" subtitle="Crie sua conta na Code Connect." />

      <p className="text-base text-content-muted">Formulário em construção.</p>

      <AuthFooterPrompt question="Já tem conta?">
        <Link as={RouterLink} to="/login" variant="accent" className="text-base">
          Faça seu login!
        </Link>
      </AuthFooterPrompt>
    </AuthLayout>
  )
}
