import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialLoginButton } from './SocialLoginButton'

describe('SocialLoginButton', () => {
  it('usa o rótulo como nome acessível do botão', () => {
    render(<SocialLoginButton iconSrc="/github.png" label="Entrar com Github" />)

    expect(
      screen.getByRole('button', { name: 'Entrar com Github' }),
    ).toBeInTheDocument()
  })

  it('dispara onClick', async () => {
    const onClick = vi.fn()
    render(
      <SocialLoginButton
        iconSrc="/gmail.png"
        label="Entrar com Gmail"
        onClick={onClick}
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Entrar com Gmail' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('não dispara onClick quando desabilitado', async () => {
    const onClick = vi.fn()
    render(
      <SocialLoginButton
        iconSrc="/gmail.png"
        label="Entrar com Gmail"
        onClick={onClick}
        disabled
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Entrar com Gmail' }))

    expect(onClick).not.toHaveBeenCalled()
  })
})
