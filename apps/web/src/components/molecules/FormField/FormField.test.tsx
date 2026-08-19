import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('associa o rótulo ao campo', async () => {
    render(<FormField label="Email ou usuário" placeholder="usuario123" />)

    const input = screen.getByLabelText('Email ou usuário')
    await userEvent.type(input, 'ana.dev')

    expect(input).toHaveValue('ana.dev')
  })

  it('exibe a mensagem de erro e marca o campo como inválido', () => {
    render(<FormField label="Senha" error="Informe sua senha" />)

    const input = screen.getByLabelText('Senha')
    expect(input).toBeInvalid()
    expect(screen.getByRole('alert')).toHaveTextContent('Informe sua senha')
    expect(input).toHaveAccessibleDescription('Informe sua senha')
  })

  it('não renderiza mensagem de erro quando o campo está válido', () => {
    render(<FormField label="Senha" />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
