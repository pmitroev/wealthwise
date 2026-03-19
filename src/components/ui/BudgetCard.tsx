import { useMemo } from 'react'

import { toast } from 'sonner'

import type { Budget, Transaction } from '../../types'
import { useAppStore } from '../../store/useAppStore'

import Button from './Button'
import Card from './Card'

interface BudgetCardProps {
  budget: Budget
  transactions: Transaction[]
}

function BudgetCard({ budget, transactions }: BudgetCardProps) {
  const deleteBudget = useAppStore((s) => s.deleteBudget)

  const spent = useMemo(
    () =>
      transactions
        .filter((t) => t.category === budget.category && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions, budget.category]
  )

  const percentage = Math.min((spent / budget.limit) * 100, 100)
  const isOver = spent > budget.limit

  const format = (amount: number) =>
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        {/* Left — category + note */}
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-gray-800">{budget.category}</span>
          {budget.note && (
            <span className="text-xs text-gray-400">{budget.note}</span>
          )}
        </div>

        {/* Right — amounts + delete */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p
              className={`font-bold text-lg ${isOver ? 'text-red-500' : 'text-gray-800'}`}
            >
              {format(spent)}
            </p>
            <p className="text-xs text-gray-400">of {format(budget.limit)}</p>
          </div>
          <Button
            label="Delete"
            variant="ghost"
            onClick={() => {
              deleteBudget(budget.id)
              toast.success('Budget deleted')
            }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full">
        <div
          className={`h-2 rounded-full transition-all ${isOver ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer — percentage + warning */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">
          {Math.round(percentage)}% used
        </span>
        {isOver && (
          <span className="text-xs font-medium text-red-500">
            ⚠️ Over budget!
          </span>
        )}
      </div>
    </Card>
  )
}

export default BudgetCard
