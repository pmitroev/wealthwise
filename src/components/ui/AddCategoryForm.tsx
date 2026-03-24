import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import { useAppStore } from '../../store/useAppStore'

import Button from './Button'
import { InputField } from './InputField'

const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required'),
})

interface AddCategoryFormProps {
  onSuccess?: () => void
}

function AddCategoryForm({ onSuccess }: AddCategoryFormProps) {
  const addCategory = useAppStore((s) => s.addCategory)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CategorySchema),
  })

  const onSubmit = (data: z.infer<typeof CategorySchema>) => {
    addCategory({ id: crypto.randomUUID(), ...data })
    toast.success('Category added')
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
      />

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

      <Button type="submit" label="Add Category"></Button>
    </form>
  )
}

export default AddCategoryForm
