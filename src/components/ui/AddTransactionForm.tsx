import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useTransactions } from '../../context/TransactionContext'
import type { Category } from '../../types'

import Button from './Button'
import { Field, inputClass } from './Field'

// --- Schema ---
const TransactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive('Must be a positive number')
  ),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
})

// --- Form Component ---
interface AddTransactionFormProps {
  categories: Category[]
  onSuccess?: () => void // called after successful submit
}

function AddTransactionForm({
  categories,
  onSuccess,
}: AddTransactionFormProps) {
  const { dispatch } = useTransactions()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = (data: z.infer<typeof TransactionSchema>) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        id: crypto.randomUUID(), // built-in browser API for unique IDs
        ...data,
      },
    })
    reset()
    onSuccess?.() // 👈 optional chaining — calls it only if it was passed
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Description */}
      <Field label="Description" error={errors.description?.message}>
        <input
          {...register('description')}
          placeholder="e.g. Grocery shopping"
          className={inputClass(!!errors.description)}
        />
      </Field>

      {/* Amount */}
      <Field label="Amount ($)" error={errors.amount?.message}>
        <input
          {...register('amount')}
          type="number"
          step="0.01"
          placeholder="0.00"
          className={inputClass(!!errors.amount)}
        />
      </Field>

      {/* Type */}
      <Field label="Type" error={errors.type?.message}>
        <select {...register('type')} className={inputClass(!!errors.type)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </Field>

      {/* Category */}
      <Field label="Category" error={errors.category?.message}>
        <select
          {...register('category')}
          className={inputClass(!!errors.category)}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </Field>

      {/* Date */}
      <Field label="Date" error={errors.date?.message}>
        <input
          {...register('date')}
          type="date"
          className={inputClass(!!errors.date)}
        />
      </Field>

      <Button type="submit" label="Add Transaction"></Button>
    </form>
  )
}

export default AddTransactionForm
