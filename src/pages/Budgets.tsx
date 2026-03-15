import { useState } from "react"
import { useTransactions } from "../context/TransactionContext"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import AddBudgetForm from "../components/ui/AddBudgetForm"
import BudgetCard from "../components/ui/BudgetCard"

function Budgets() {
  const { budgets, state, categories} = useTransactions()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">🎯 Budgets</h1>
        <Button
          label={showForm ? 'Cancel' : '+ Add Budget'}
          onClick={() => setShowForm(prev => !prev)}
          variant={showForm ? 'ghost' : 'primary'}
        />
      </div>

      {/* Form — conditionally rendered */}
      {showForm && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            New Budget
          </h2>
          <AddBudgetForm categories={categories} onSuccess={() => setShowForm(false)} />
        </Card>
      )}

      {/* Budget List */}
      {budgets.length > 0 ? budgets.map(budget => (
        <BudgetCard key={budget.id} budget={budget} transactions={state.transactions}/>
      )) :
      <p className="text-sm text-gray-500">
        There aren't any budgets
      </p>}
    </div>
  )
}
export default Budgets