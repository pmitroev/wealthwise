interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
  autoFocus?: boolean
}

export const inputClass = (hasError: boolean) =>
  `border rounded-lg px-3 py-2 text-sm outline-none transition-colors
   focus:ring-2 focus:ring-blue-500
   ${hasError ? 'border-red-400' : 'border-gray-200'}`

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
