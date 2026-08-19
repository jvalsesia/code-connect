import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Link } from '../../atoms/Link'
import { AuthFooterPrompt } from './AuthFooterPrompt'

describe('AuthFooterPrompt', () => {
  it('renderiza a pergunta e o link de ação', () => {
    render(
      <AuthFooterPrompt question="Ainda não tem conta?">
        <Link href="/cadastro" variant="accent">
          Crie seu cadastro!
        </Link>
      </AuthFooterPrompt>,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro',
    )
  })

  it('serve também ao fluxo inverso, do cadastro para o login', () => {
    render(
      <AuthFooterPrompt question="Já tem conta?">
        <Link href="/login" variant="accent">
          Faça seu login!
        </Link>
      </AuthFooterPrompt>,
    )

    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute(
      'href',
      '/login',
    )
  })
})
