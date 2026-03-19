import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { toast } from 'sonner'

import type { Category } from '../../types'
import { useAppStore } from '../../store/useAppStore'

import Button from './Button'
import { InputField } from './InputField'
import { SelectField } from './SelectField'

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
  const addTransaction = useAppStore((s) => s.addTransaction)

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
    addTransaction({ id: crypto.randomUUID(), ...data })
    toast.success('Transaction added')
    reset()
    onSuccess?.() // 👈 optional chaining — calls it only if it was passed
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Description */}
      <InputField
        label="Description"
        error={errors.description?.message}
        registration={register('description')}
        placeholder="e.g. Grocery shopping"
      />

      {/* Amount */}
      <InputField
        label="Amount ($)"
        error={errors.amount?.message}
        registration={register('amount')}
        type="number"
        step="0.01"
        placeholder="0.00"
      />

      {/* Type */}
      <SelectField
        label="Type"
        error={errors.type?.message}
        registration={register('type')}
        options={[
          { value: 'expense', label: 'Expense' },
          { value: 'income', label: 'Income' },
        ]}
      />

      {/* Category */}
      <SelectField
        label="Category"
        error={errors.category?.message}
        registration={register('category')}
        options={categories.map((cat) => ({
          value: cat.name,
          label: `${cat.icon} ${cat.name}`,
        }))}
      />

      {/* Date */}
      <InputField
        label="Date"
        error={errors.date?.message}
        registration={register('date')}
        type="date"
      />

      <Button type="submit" label="Add Transaction"></Button>
    </form>
  )
}

export default AddTransactionForm
