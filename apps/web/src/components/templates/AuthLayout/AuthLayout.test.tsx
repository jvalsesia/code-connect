import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthLayout } from './AuthLayout'

describe('AuthLayout', () => {
  it('renderiza o banner recebido', () => {
    render(
      <AuthLayout
        banner={{ src: '/banner-login.png', alt: 'Pessoa desenvolvendo na Code Connect' }}
      >
        <p>conteúdo</p>
      </AuthLayout>,
    )

    expect(
      screen.getByRole('img', { name: 'Pessoa desenvolvendo na Code Connect' }),
    ).toHaveAttribute('src', '/banner-login.png')
  })

  it('renderiza o conteúdo da coluna direita', () => {
    render(
      <AuthLayout banner={{ src: '/banner-cadastro.png', alt: 'Cadastro' }}>
        <h1>Cadastro</h1>
      </AuthLayout>,
    )

    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
  })
})
