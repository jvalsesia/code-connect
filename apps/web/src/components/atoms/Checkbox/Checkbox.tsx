import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({
  label,
  onCheckedChange,
  id,
  className,
  ...props
}: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 text-sm text-content',
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        onChange={(event) => onCheckedChange?.(event.target.checked)}
        className={cn(
          'size-5 cursor-pointer appearance-none rounded-sm border-2 border-brand bg-transparent',
          "checked:bg-brand checked:bg-[length:100%_100%] checked:bg-center checked:bg-no-repeat",
          "checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23171d1f'%3E%3Cpath d='M7.6 14.2 3.8 10.4l1.4-1.4 2.4 2.4 6.8-6.8 1.4 1.4z'/%3E%3C/svg%3E\")]",
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        )}
        {...props}
      />
      {label}
    </label>
  )
}
