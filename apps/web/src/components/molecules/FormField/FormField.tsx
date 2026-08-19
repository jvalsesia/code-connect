import { useId } from 'react'
import { Input, type InputProps } from '../../atoms/Input'
import { cn } from '../../../lib/cn'

export interface FormFieldProps extends Omit<InputProps, 'hasError' | 'id'> {
  label: string
  /** Mensagem de erro; quando presente, o campo entra em estado inválido. */
  error?: string
  id?: string
  className?: string
}

export function FormField({
  label,
  error,
  id,
  className,
  ...inputProps
}: FormFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={fieldId} className="text-base text-content">
        {label}
      </label>
      <Input
        id={fieldId}
        hasError={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
