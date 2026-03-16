import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useTransactions } from '../../context/TransactionContext'

import { Field, inputClass } from './Field'

const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required'),
})

interface AddCategoryFormProps {
  onSuccess?: () => void
}

function AddCategoryForm({ onSuccess }: AddCategoryFormProps) {
  const { categoryDispatch } = useTransactions()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CategorySchema),
  })

  const onSubmit = (data: z.infer<typeof CategorySchema>) => {
    categoryDispatch({
      type: 'ADD_CATEGORY',
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
      {/* Name */}
      <Field label="Name" error={errors.name?.message}>
        <input
          {...register('name')}
          placeholder="e.g. Housing"
          className={inputClass(!!errors.name)}
        />
      </Field>

      {/* Icon */}
      <Field label="Icon" error={errors.icon?.message}>
        <input
          {...register('icon')}
          placeholder="e.g. 🏠"
          className={inputClass(!!errors.icon)}
        />
      </Field>

      {/* Color */}
      <Field label="Color" error={errors.color?.message}>
        <input type="color" {...register('color')} />
      </Field>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2.5 rounded-lg font-medium
                   hover:bg-blue-700 transition-colors mt-2"
      >
        Add Category
      </button>
    </form>
  )
}

export default AddCategoryForm
