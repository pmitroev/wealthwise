interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'ghost'
  disabled?: boolean 
}

function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  )
}

export default Button