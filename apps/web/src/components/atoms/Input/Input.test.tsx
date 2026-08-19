import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renderiza com o placeholder informado', () => {
    render(<Input aria-label="Email ou usuário" placeholder="usuario123" />)

    expect(screen.getByPlaceholderText('usuario123')).toBeInTheDocument()
  })

  it('registra o que o usuário digita', async () => {
    render(<Input aria-label="Email ou usuário" />)

    const input = screen.getByRole('textbox', { name: 'Email ou usuário' })
    await userEvent.type(input, 'ana.dev')

    expect(input).toHaveValue('ana.dev')
  })

  it('marca o campo como inválido quando hasError', () => {
    render(<Input aria-label="Email ou usuário" hasError />)

    expect(screen.getByRole('textbox', { name: 'Email ou usuário' })).toBeInvalid()
  })

  it('não aceita digitação quando desabilitado', async () => {
    render(<Input aria-label="Email ou usuário" disabled />)

    const input = screen.getByRole('textbox', { name: 'Email ou usuário' })
    await userEvent.type(input, 'ana.dev')

    expect(input).toHaveValue('')
  })
})
