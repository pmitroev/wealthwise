import { useTransactions } from '../context/TransactionContext'
import StatCard from '../components/ui/StatCard'
import Card from '../components/ui/Card'
import ExpenseChart from '../components/ui/ExpenseChart'
import RecentTransactions from '../components/ui/RecentTransactions'

function Dashboard() {
  const { balance, totalIncome, totalExpenses, state } = useTransactions()

  const transactionsCount = state.transactions.length

  const expenseCategories = [...new Set(
    state.transactions
      .filter(t => t.type === 'expense')
      .map(t => t.category)
  )].length

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Balance"  amount={balance}       type="balance" />
        <StatCard title="Total Income"   amount={totalIncome}   type="income"  />
        <StatCard title="Total Expenses" amount={totalExpenses} type="expense" />
      </div>
      <p className="text-sm text-gray-500">
        You have {transactionsCount} {transactionsCount === 1 ? 'transaction' : 'transactions'} this month
      </p>

      {/* Chart + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Spending by Category
          </h2>
          <p>Categories count: {expenseCategories}</p>
          <ExpenseChart transactions={state.transactions} />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Transactions
          </h2>
          <RecentTransactions transactions={state.transactions} />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard