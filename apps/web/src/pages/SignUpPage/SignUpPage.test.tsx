import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SignUpPage } from './SignUpPage'

describe('SignUpPage', () => {
  it('reaproveita o layout de autenticação e leva de volta ao login', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute(
      'href',
      '/login',
    )
  })
})
