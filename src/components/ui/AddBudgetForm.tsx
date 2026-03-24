import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import { useAppStore } from '../../store/useAppStore'
import type { Category } from '../../types'

import Button from './Button'
import { InputField } from './InputField'
import { SelectField } from './SelectField'

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
  const addBudget = useAppStore((s) => s.addBudget)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(BudgetSchema),
  })

  const onSubmit = (data: z.infer<typeof BudgetSchema>) => {
    addBudget({ id: crypto.randomUUID(), ...data })
    toast.success('Budget added')
    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      {/* Limit */}
      <InputField
        label="Amount ($)"
        error={errors.limit?.message}
        registration={register('limit')}
        type="number"
        step="1"
        placeholder="0.00"
      />

      {/* Note */}
      <InputField
        label="Note (optional)"
        error={errors.note?.message}
        registration={register('note')}
        placeholder="Budget for holiday"
      />

      <Button type="submit" label="Add budget"></Button>
    </form>
  )
}

export default AddBudgetForm
