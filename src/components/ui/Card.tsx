interface CardProps {
  children: React.ReactNode
  className?: string
}

function Card({children, className}: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 ${className ?? ''}`}>
      {children}
    </div>
  )
}

export default Card