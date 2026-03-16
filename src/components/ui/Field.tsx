// src/components/ui/Field.tsx
import { useEffect, useRef } from 'react'

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
  autoFocus?: boolean // 👈 the new prop
}

export const inputClass = (hasError: boolean) =>
  `border rounded-lg px-3 py-2 text-sm outline-none transition-colors
   focus:ring-2 focus:ring-blue-500
   ${hasError ? 'border-red-400' : 'border-gray-200'}`

export function Field({
  label,
  error,
  children,
  autoFocus = false,
}: FieldProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoFocus) {
      const input = ref.current?.querySelector('input')
      input?.focus()
    }
  }, [autoFocus])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
