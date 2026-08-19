import type { AnchorHTMLAttributes } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Link } from './Link'

describe('Link', () => {
  it('renderiza uma âncora com o destino informado', () => {
    render(<Link href="/esqueci-a-senha">Esqueci a senha</Link>)

    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toHaveAttribute(
      'href',
      '/esqueci-a-senha',
    )
  })

  it('aplica a variante de destaque', () => {
    render(
      <Link href="/cadastro" variant="accent">
        Crie seu cadastro!
      </Link>,
    )

    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveClass(
      'text-brand',
    )
  })

  it('permite trocar o elemento renderizado', () => {
    function FakeRouterLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
      return <a data-router="true" {...props} />
    }

    render(
      <Link as={FakeRouterLink} href="/cadastro">
        Cadastre-se
      </Link>,
    )

    const link = screen.getByRole('link', { name: 'Cadastre-se' })
    expect(link).toHaveAttribute('href', '/cadastro')
    expect(link).toHaveAttribute('data-router', 'true')
  })
})
