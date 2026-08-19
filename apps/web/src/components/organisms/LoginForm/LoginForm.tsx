import { useState, type FormEvent } from 'react'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { Link } from '../../atoms/Link'
import { FormField } from '../../molecules/FormField'
import { cn } from '../../../lib/cn'

export interface LoginFormValues {
  identifier: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
  isSubmitting?: boolean
  /** Erro vindo de fora (credenciais inválidas, indisponibilidade, etc.). */
  errorMessage?: string
  forgotPasswordHref?: string
  className?: string
}

type FieldErrors = Partial<Record<'identifier' | 'password', string>>

export const PASSWORD_MIN_LENGTH = 6

function validate(values: LoginFormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.identifier.trim()) {
    errors.identifier = 'Informe seu email ou usuário.'
  }

  if (!values.password) {
    errors.password = 'Informe sua senha.'
  } else if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`
  }

  return errors
}

export function LoginForm({
  onSubmit,
  isSubmitting = false,
  errorMessage,
  forgotPasswordHref = '#',
  className,
}: LoginFormProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const values: LoginFormValues = { identifier, password, rememberMe }
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    onSubmit(values)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={cn('flex flex-col gap-5', className)}>
      <FormField
        label="Email ou usuário"
        name="identifier"
        autoComplete="username"
        placeholder="usuario123"
        value={identifier}
        error={errors.identifier}
        onChange={(event) => setIdentifier(event.target.value)}
      />

      <FormField
        label="Senha"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••"
        value={password}
        error={errors.password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <div className="flex items-center justify-between gap-4">
        <Checkbox
          label="Lembrar-me"
          name="rememberMe"
          checked={rememberMe}
          onCheckedChange={setRememberMe}
        />
        <Link href={forgotPasswordHref}>Esqueci a senha</Link>
      </div>

      {errorMessage ? (
        <p role="alert" className="text-sm text-danger">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" isLoading={isSubmitting} loadingLabel="Entrando…" iconRight="→">
        Login
      </Button>
    </form>
  )
}
