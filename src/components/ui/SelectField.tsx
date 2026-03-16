import type { UseFormRegisterReturn } from 'react-hook-form'

import { Field, inputClass } from './Field'

interface SelectFieldProps {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
  options: { value: string; label: string }[]
}

export function SelectField({
  label,
  error,
  registration,
  options,
}: SelectFieldProps) {
  return (
    <Field label={label} error={error}>
      <select {...registration} className={inputClass(!!error)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  )
}
