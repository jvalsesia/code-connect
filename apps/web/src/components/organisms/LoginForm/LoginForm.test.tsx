import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renderiza os campos, a opção de lembrar e o botão de login', () => {
    render(<LoginForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('mostra erros e não envia quando o formulário está vazio', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Informe seu email ou usuário.')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('cobra o tamanho mínimo da senha', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'ana.dev')
    await userEvent.type(screen.getByLabelText('Senha'), '123')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(
      screen.getByText('A senha deve ter no mínimo 6 caracteres.'),
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('envia os valores preenchidos', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'ana.dev')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123')
    await userEvent.click(screen.getByRole('checkbox', { name: 'Lembrar-me' }))
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(onSubmit).toHaveBeenCalledWith({
      identifier: 'ana.dev',
      password: 'segredo123',
      rememberMe: true,
    })
  })

  it('bloqueia o botão enquanto envia', () => {
    render(<LoginForm onSubmit={vi.fn()} isSubmitting />)

    expect(screen.getByRole('button', { name: 'Entrando…' })).toBeDisabled()
  })

  it('mostra a mensagem de erro vinda de fora', () => {
    render(<LoginForm onSubmit={vi.fn()} errorMessage="Credenciais inválidas." />)

    expect(screen.getByRole('alert')).toHaveTextContent('Credenciais inválidas.')
  })
})
