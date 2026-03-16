export interface Transaction {
  readonly id: string
  amount: number
  description?: string
  category: string
  type: 'income' | 'expense'
  date: string
}

export interface Budget {
  readonly id: string
  category: string
  limit: number
  note?: string
}

export interface Category {
  readonly id: string
  name: string
  color: string
  icon: string
}

export type AppFilter = 'all' | 'income' | 'expense'
