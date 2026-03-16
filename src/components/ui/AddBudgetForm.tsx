import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useTransactions } from '../../context/TransactionContext'
import type { Category } from '../../types'

import Button from './Button'
import { Field, inputClass } from './Field'

const BudgetSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  limit: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive('Must be a positive number')
  ),
  note: z.string().optional(),
})

interface AddBudgetFormProps {
  categories: Category[]
  onSuccess?: () => void // called after successful submit
}

function AddBudgetForm({ onSuccess, categories }: AddBudgetFormProps) {
  const { budgetDispatch } = useTransactions()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(BudgetSchema),
  })

  const onSubmit = (data: z.infer<typeof BudgetSchema>) => {
    budgetDispatch({
      type: 'ADD_BUDGET',
      payload: {
        id: crypto.randomUUID(),
        ...data,
      },
    })
    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      {/* Limit */}
      <Field label="Amount ($)" error={errors.limit?.message}>
        <input
          {...register('limit')}
          type="number"
          step="1"
          placeholder="0.00"
          className={inputClass(!!errors.limit)}
        />
      </Field>

      {/* Note */}
      <Field label="Note (optional)" error={errors.note?.message}>
        <input
          {...register('note')}
          placeholder="Budget for holiday"
          className={inputClass(!!errors.note)}
        />
      </Field>

      <Button type="submit" label="Add budget"></Button>
    </form>
  )
}

export default AddBudgetForm
