import Card from '../components/ui/Card'
import ExpenseChart from '../components/ui/ExpenseChart'
import RecentTransactions from '../components/ui/RecentTransactions'
import StatCard from '../components/ui/StatCard'
import { useAppStore } from '../store/useAppStore'

function Dashboard() {
  const transactions = useAppStore((s) => s.transactions)
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  const transactionsCount = transactions.length

  const expenseCategories = [
    ...new Set(
      transactions
        .filter((t) => t.type === 'expense')
        .map((t) => t.category)
    ),
  ].length

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Balance" amount={balance} type="balance" />
        <StatCard title="Total Income" amount={totalIncome} type="income" />
        <StatCard
          title="Total Expenses"
          amount={totalExpenses}
          type="expense"
        />
      </div>
      <p className="text-sm text-gray-500">
        You have {transactionsCount}{' '}
        {transactionsCount === 1 ? 'transaction' : 'transactions'} this month
      </p>

      {/* Chart + Recent Transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Spending by Category
          </h2>
          <p>Categories count: {expenseCategories}</p>
          <ExpenseChart transactions={transactions} />
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Recent Transactions
          </h2>
          <RecentTransactions transactions={transactions} />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
