import { useMemo } from 'react'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type { Budget, Transaction } from '../../types'

import Card from './Card'

interface BudgetRow {
  category: string
  limit: number
  spent: number
  remaining: number
  isOver: boolean
}

const format = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

const columns: ColumnDef<BudgetRow>[] = [
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ getValue }) => (
      <span className="font-medium text-gray-800">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'limit',
    header: () => <span className="block text-right">Limit</span>,
    cell: ({ getValue }) => (
      <span className="block text-right text-gray-600">
        {format(getValue<number>())}
      </span>
    ),
  },
  {
    accessorKey: 'spent',
    header: () => <span className="block text-right">Spent</span>,
    cell: ({ getValue }) => (
      <span className="block text-right text-gray-600">
        {format(getValue<number>())}
      </span>
    ),
  },
  {
    accessorKey: 'remaining',
    header: () => <span className="block text-right">Remaining</span>,
    cell: ({ row, getValue }) => (
      <span
        className={`block text-right font-medium ${row.original.isOver ? 'text-red-500' : 'text-green-600'}`}
      >
        {format(getValue<number>())}
      </span>
    ),
  },
  {
    accessorKey: 'isOver',
    header: () => <span className="block text-right">Status</span>,
    cell: ({ getValue }) =>
      getValue<boolean>() ? (
        <span className="block font-medium text-right text-red-500">
          Over ⚠️
        </span>
      ) : (
        <span className="block text-right text-green-600">On track</span>
      ),
  },
]

interface BudgetTableProps {
  budgets: Budget[]
  transactions: Transaction[]
}

function BudgetTable({ budgets, transactions }: BudgetTableProps) {
  const data = useMemo<BudgetRow[]>(
    () =>
      budgets.map((budget) => {
        const spent = transactions
          .filter((t) => t.category === budget.category && t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
        const remaining = Math.max(0, budget.limit - spent)
        return {
          category: budget.category,
          limit: budget.limit,
          spent,
          remaining,
          isOver: spent > budget.limit,
        }
      }),
    [budgets, transactions]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-left text-gray-500 border-b border-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="pb-3 font-medium">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-50 last:border-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default BudgetTable
