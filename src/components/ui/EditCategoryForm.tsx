import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useTransactions } from '../../context/TransactionContext'
import type { Category } from '../../types'

import Button from './Button'
import { InputField } from './InputField'

const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required'),
})

interface EditCategoryFormProps {
  category: Category
  onSuccess?: () => void
  onCancel?: () => void
}

function EditCategoryForm({
  category,
  onSuccess,
  onCancel,
}: EditCategoryFormProps) {
  const { categoryDispatch } = useTransactions()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category.name,
      icon: category.icon,
      color: category.color,
    },
  })

  const onSubmit = (data: z.infer<typeof CategorySchema>) => {
    categoryDispatch({
      type: 'UPDATE_CATEGORY',
      payload: {
        id: category.id,
        ...data,
      },
    })
    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Name */}
      <InputField
        label="Name"
        error={errors.name?.message}
        registration={register('name')}
        autoFocus
      />

      {/* Icon */}
      <InputField
        label="Icon"
        error={errors.icon?.message}
        registration={register('icon')}
      />

      {/* Color */}
      <InputField
        label="Color"
        type="color"
        error={errors.color?.message}
        registration={register('color')}
      />

      <div className="flex justify-center gap-2 mt-2">
        <Button type="submit" label="Update Category"></Button>
        <Button
          type="button"
          label="Cancel"
          onClick={() => onCancel?.()}
          variant="ghost"
        ></Button>
      </div>
    </form>
  )
}

export default EditCategoryForm
