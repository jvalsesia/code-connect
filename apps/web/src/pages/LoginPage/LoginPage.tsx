import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../../components/templates/AuthLayout'
import { AuthFooterPrompt, AuthHeading, SocialLoginGroup } from '../../components/molecules'
import { Link } from '../../components/atoms/Link'
import { LoginForm, type LoginFormValues } from '../../components/organisms/LoginForm'
import { LOGIN_BANNER, SOCIAL_PROVIDERS } from '../authProviders'

export function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(values: LoginFormValues) {
    // A integração com a API entra aqui (POST /api/v1/sessions).
    setIsSubmitting(true)
    console.info('login', values)
    setIsSubmitting(false)
  }

  return (
    <AuthLayout banner={LOGIN_BANNER}>
      <AuthHeading title="Login" subtitle="Boas-vindas! Faça seu login." />

      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      <SocialLoginGroup
        label="ou entre com outras contas"
        providers={SOCIAL_PROVIDERS}
        disabled={isSubmitting}
      />

      <AuthFooterPrompt question="Ainda não tem conta?">
        <Link as={RouterLink} to="/cadastro" variant="accent" className="text-base">
          Crie seu cadastro! <span aria-hidden="true">📋</span>
        </Link>
      </AuthFooterPrompt>
    </AuthLayout>
  )
}
