import { useState } from 'react'

import AddBudgetForm from '../components/ui/AddBudgetForm'
import BudgetCard from '../components/ui/BudgetCard'
import BudgetTable from '../components/ui/BudgetTable'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useTransactions } from '../context/TransactionContext'

function Budgets() {
  const { budgets, state, categories } = useTransactions()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">🎯 Budgets</h1>
        <Button
          label={showForm ? 'Cancel' : '+ Add Budget'}
          onClick={() => setShowForm((prev) => !prev)}
          variant={showForm ? 'ghost' : 'primary'}
        />
      </div>

      {/* Form — conditionally rendered */}
      {showForm && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            New Budget
          </h2>
          <AddBudgetForm
            categories={categories}
            onSuccess={() => setShowForm(false)}
          />
        </Card>
      )}

      {/* Summary Table */}
      {budgets.length > 0 && (
        <BudgetTable budgets={budgets} transactions={state.transactions} />
      )}

      {/* Budget List */}
      {budgets.length > 0 ? (
        budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            transactions={state.transactions}
          />
        ))
      ) : (
        <p className="text-sm text-gray-500">There aren't any budgets</p>
      )}
    </div>
  )
}
export default Budgets
