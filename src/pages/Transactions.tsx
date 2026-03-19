import { useState } from 'react'

import AddTransactionForm from '../components/ui/AddTransactionForm'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAppStore } from '../store/useAppStore'

function Transactions() {
  const categories = useAppStore((s) => s.categories)
  const filter = useAppStore((s) => s.filter)
  const setFilter = useAppStore((s) => s.setFilter)
  const deleteTransaction = useAppStore((s) => s.deleteTransaction)
  const transactions = useAppStore((s) => s.transactions)
  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filter)
  const [showForm, setShowForm] = useState(false)
  const currentFilter = filter

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">💸 Transactions</h1>
        <Button
          label={showForm ? 'Cancel' : '+ Add Transaction'}
          onClick={() => setShowForm((prev) => !prev)}
          variant={showForm ? 'ghost' : 'primary'}
        />
      </div>

      {/* Form — conditionally rendered */}
      {showForm && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            New Transaction
          </h2>
          <AddTransactionForm
            categories={categories}
            onSuccess={() => setShowForm(false)}
          />
        </Card>
      )}

      {/*Transaction Filter*/}
      <div className="flex items-center justify-center">
        <Button
          label="All"
          variant={currentFilter === 'all' ? 'primary' : 'ghost'}
          onClick={() => setFilter('all')}
        />
        <Button
          label="Income"
          variant={currentFilter === 'income' ? 'primary' : 'ghost'}
          onClick={() => setFilter('income')}
        />
        <Button
          label="Expense"
          variant={currentFilter === 'expense' ? 'primary' : 'ghost'}
          onClick={() => setFilter('expense')}
        />
      </div>
      {/* Transaction List */}
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <Card key={transaction.id}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-gray-800">
                  {transaction.description ?? 'No description'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge label={transaction.type} variant={transaction.type} />
                  <span className="text-xs text-gray-400">
                    {transaction.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    · {transaction.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p
                  className={`font-bold text-lg ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}$
                  {transaction.amount.toLocaleString()}
                </p>
                <Button
                  label="Delete"
                  variant="ghost"
                  onClick={() => deleteTransaction(transaction.id)}
                />
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">
          There aren't any {currentFilter === 'all' ? '' : currentFilter}{' '}
          transactions
        </p>
      )}
    </div>
  )
}

export default Transactions
