import { type ReactNode, createContext, useContext } from 'react'

import useFilter from '../hooks/useFilter'
import useLocalStorage from '../hooks/useLocalStorage'
import type { AppFilter, Budget, Category, Transaction } from '../types'

// --- State & Actions ---
interface TransactionState {
  transactions: Transaction[]
  budgets: Budget[]
  categories: Category[]
  filter: AppFilter
}

type BudgetAction =
  | { type: 'ADD_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: string }

type TransactionAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTER'; payload: AppFilter }

type CategoryAction =
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'UPDATE_CATEGORY'; payload: Category }

const initialState: TransactionState = {
  filter: 'all',
  transactions: [],
  budgets: [],
  categories: [],
}

// --- Context ---
interface TransactionContextType {
  state: TransactionState
  dispatch: React.Dispatch<TransactionAction>
  // Derived data — computed from state, not stored separately
  filteredTransactions: Transaction[]
  totalIncome: number
  totalExpenses: number
  balance: number
  budgets: Budget[]
  budgetDispatch: (action: BudgetAction) => void
  categories: Category[]
  categoryDispatch: (action: CategoryAction) => void
}

const TransactionContext = createContext<TransactionContextType | null>(null)

// --- Provider ---
export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    'wealthwise-transactions',
    initialState.transactions
  )
  const [filter, setFilter] = useLocalStorage<AppFilter>(
    'wealthwise-filter',
    'all'
  )

  const [budgets, setBudgets] = useLocalStorage<Budget[]>(
    'wealthwise-budgets',
    initialState.budgets
  )

  const [categories, setCategories] = useLocalStorage<Category[]>(
    'wealthwise-categories',
    initialState.categories
  )

  // Rebuild state object so nothing else in the app needs to change
  const state = { transactions, budgets, filter, categories }

  // Rebuild dispatch to use setTransactions/setFilter instead of useReducer
  const dispatch = (action: TransactionAction) => {
    switch (action.type) {
      case 'ADD_TRANSACTION':
        setTransactions((prev) => [action.payload, ...prev])
        break
      case 'DELETE_TRANSACTION':
        setTransactions((prev) => prev.filter((t) => t.id !== action.payload))
        break
      case 'SET_FILTER':
        setFilter(action.payload)
        break
    }
  }

  const budgetDispatch = (action: BudgetAction) => {
    switch (action.type) {
      case 'ADD_BUDGET':
        setBudgets((prev) => [action.payload, ...prev])
        break
      case 'DELETE_BUDGET':
        setBudgets((prev) => prev.filter((b) => b.id !== action.payload))
        break
    }
  }

  const categoryDispatch = (action: CategoryAction) => {
    switch (action.type) {
      case 'ADD_CATEGORY':
        setCategories((prev) => [action.payload, ...prev])
        break
      case 'DELETE_CATEGORY':
        setCategories((prev) => prev.filter((c) => c.id !== action.payload))
        break
      case 'UPDATE_CATEGORY':
        setCategories((prev) =>
          prev.map((c) => (c.id === action.payload.id ? action.payload : c))
        )
        break
    }
  }

  const filteredTransactions = useFilter(transactions, filter)

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <TransactionContext.Provider
      value={{
        state,
        dispatch,
        filteredTransactions,
        totalIncome,
        totalExpenses,
        balance,
        budgets,
        budgetDispatch,
        categories,
        categoryDispatch,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

// --- Custom Hook ---
export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider')
  }
  return context
}
