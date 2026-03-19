import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AppFilter, Budget, Category, Transaction } from '../types'

interface AppState {
  transactions: Transaction[]
  budgets: Budget[]
  categories: Category[]
  filter: AppFilter

  // transaction actions
  addTransaction: (t: Transaction) => void
  deleteTransaction: (id: string) => void
  setFilter: (filter: AppFilter) => void

  // budget actions
  addBudget: (b: Budget) => void
  deleteBudget: (id: string) => void

  // category actions
  addCategory: (c: Category) => void
  deleteCategory: (id: string) => void
  updateCategory: (c: Category) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      transactions: [],
      budgets: [],
      categories: [],
      filter: 'all',

      addTransaction: (t) =>
        set((s) => ({ transactions: [t, ...s.transactions] })),
      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),
      setFilter: (filter) => set({ filter }),

      addBudget: (b) => set((s) => ({ budgets: [b, ...s.budgets] })),
      deleteBudget: (id) =>
        set((s) => ({ budgets: s.budgets.filter((b) => b.id !== id) })),

      addCategory: (c) => set((s) => ({ categories: [c, ...s.categories] })),
      deleteCategory: (id) =>
        set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),
      updateCategory: (c) =>
        set((s) => ({
          categories: s.categories.map((cat) => (cat.id === c.id ? c : cat)),
        })),
    }),
    { name: 'wealthwise-store' }
  )
)
