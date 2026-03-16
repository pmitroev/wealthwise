import { type Transaction } from '../../types'

import Badge from './Badge'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 5) // last 5 only

  return (
    <div className="flex flex-col gap-2">
      {recent.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
        >
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-gray-800">
              {transaction.description ?? 'No description'}
            </p>
            <div className="flex items-center gap-2">
              <Badge label={transaction.type} variant={transaction.type} />
              <span className="text-xs text-gray-400">{transaction.date}</span>
            </div>
          </div>
          <p
            className={`font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {transaction.type === 'income' ? '+' : '-'}$
            {transaction.amount.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default RecentTransactions
