import { useEffect, useRef } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { Field, inputClass } from './Field'

interface InputFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'ref'
> {
  label: string
  error?: string
  autoFocus?: boolean
  registration?: UseFormRegisterReturn
}

export function InputField({
  label,
  error,
  autoFocus = false,
  registration,
  ...props
}: InputFieldProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [autoFocus])

  return (
    <Field label={label} error={error}>
      <input
        {...props}
        {...registration}
        className={inputClass(!!error)}
        ref={(e) => {
          registration?.ref(e)
          if (e) ref.current = e
        }}
      />
    </Field>
  )
}
