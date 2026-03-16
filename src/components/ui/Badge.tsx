interface BadgeProps {
  label: string
  variant: 'income' | 'expense'
}

function Badge({ label, variant }: BadgeProps) {
  const styles = {
    income: 'bg-green-100 text-green-700',
    expense: 'bg-red-100 text-red-700',
  }

  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[variant]}`}
    >
      {label}
    </span>
  )
}

export default Badge
