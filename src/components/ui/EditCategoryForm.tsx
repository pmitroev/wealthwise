import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useTransactions } from '../../context/TransactionContext'
import type { Category } from '../../types'

import Button from './Button'
import { Field, inputClass } from './Field'

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
      <Field label="Name" error={errors.name?.message} autoFocus>
        <input {...register('name')} className={inputClass(!!errors.name)} />
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

      <div className="flex gap-2 mt-2 justify-center">
        <Button type="submit" label="Update Category"></Button>
        <Button
          type="button"
          label="Cancel"
          onClick={() => onCancel}
          variant="ghost"
        ></Button>
      </div>
    </form>
  )
}

export default EditCategoryForm
