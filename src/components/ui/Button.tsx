interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'submit',
}: ButtonProps) {
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  )
}

export default Button
