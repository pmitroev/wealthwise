import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { type Transaction } from '../../types'

interface ExpenseChartProps {
  transactions: Transaction[]
}

const COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f97316',
  '#a855f7',
  '#ef4444',
  '#eab308',
]

function ExpenseChart({ transactions }: ExpenseChartProps) {
  // Group expenses by category and sum amounts
  const data = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: { name: string; value: number }[], t) => {
      const existing = acc.find((item) => item.name === t.category)
      if (existing) {
        existing.value += t.amount
      } else {
        acc.push({ name: t.category, value: t.amount })
      }
      return acc
    }, [])

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400">
        No expense data yet
      </div>
    )
  }

  const dataWithColors = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={dataWithColors}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        />
        <Tooltip
          formatter={(value) => {
            if (typeof value !== 'number') return String(value)
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ExpenseChart
