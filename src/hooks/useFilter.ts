import type { AppFilter, Transaction } from "../types"

function useFilter(transactions: Transaction[], filterValue: AppFilter) {
  const filteredTransactions = transactions.filter(t => {
    if (filterValue === 'all') return true
    return t.type === filterValue
  })

  return filteredTransactions
}

export default useFilter