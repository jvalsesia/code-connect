import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza o rótulo recebido', () => {
    render(<Button>Login</Button>)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('dispara onClick quando clicado', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Login</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('não dispara onClick quando desabilitado', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Login
      </Button>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('mostra o rótulo de carregamento e bloqueia o clique', async () => {
    const onClick = vi.fn()
    render(
      <Button isLoading loadingLabel="Entrando…" onClick={onClick}>
        Login
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Entrando…' })
    expect(button).toBeDisabled()

    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('exibe o ícone à direita sem poluir o nome acessível', () => {
    render(<Button iconRight="→">Login</Button>)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })
})
