import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renderiza associado ao seu rótulo', () => {
    render(<Checkbox label="Lembrar-me" />)

    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeInTheDocument()
  })

  it('avisa a mudança de estado ao ser clicado', async () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox label="Lembrar-me" onCheckedChange={onCheckedChange} />)

    await userEvent.click(screen.getByRole('checkbox', { name: 'Lembrar-me' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('respeita o estado controlado', () => {
    render(<Checkbox label="Lembrar-me" checked onCheckedChange={() => {}} />)

    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeChecked()
  })
})
