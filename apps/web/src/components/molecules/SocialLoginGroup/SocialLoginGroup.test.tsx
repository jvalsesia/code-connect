import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialLoginGroup, type SocialProvider } from './SocialLoginGroup'

const providers: SocialProvider[] = [
  { id: 'github', iconSrc: '/github.png', label: 'Entrar com Github' },
  { id: 'gmail', iconSrc: '/gmail.png', label: 'Entrar com Gmail' },
]

describe('SocialLoginGroup', () => {
  it('renderiza o rótulo e um botão por provedor', () => {
    render(
      <SocialLoginGroup label="ou entre com outras contas" providers={providers} />,
    )

    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('informa qual provedor foi escolhido', async () => {
    const onSelect = vi.fn()
    render(
      <SocialLoginGroup
        label="ou entre com outras contas"
        providers={providers}
        onSelect={onSelect}
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Entrar com Github' }))

    expect(onSelect).toHaveBeenCalledWith('github')
  })

  it('desabilita todos os provedores quando disabled', () => {
    render(
      <SocialLoginGroup
        label="ou entre com outras contas"
        providers={providers}
        disabled
      />,
    )

    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled()
    }
  })
})
