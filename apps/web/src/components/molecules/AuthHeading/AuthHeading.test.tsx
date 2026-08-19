import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthHeading } from './AuthHeading'

describe('AuthHeading', () => {
  it('renderiza título e subtítulo', () => {
    render(<AuthHeading title="Login" subtitle="Boas-vindas! Faça seu login." />)

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()
  })

  it('funciona sem subtítulo', () => {
    render(<AuthHeading title="Cadastro" />)

    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
  })
})
