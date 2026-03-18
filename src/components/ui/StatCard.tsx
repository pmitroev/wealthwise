import Card from './Card'

interface StatCardProps {
  title: string
  amount: number
  type: 'balance' | 'income' | 'expense'
}

function StatCard({ title, amount, type }: StatCardProps) {
  const amountStyles = {
    balance: 'text-blue-600',
    income: 'text-green-600',
    expense: 'text-red-600',
  }

  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <Card>
      <p className="mb-1 text-sm font-medium text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${amountStyles[type]}`}>
        {formattedAmount}
      </p>
    </Card>
  )
}

export default StatCard
