import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTransactions } from '../../context/TransactionContext'
import type { Category } from "../../types"
import { useEffect, useRef } from "react"

const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required'),
})

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// --- Input className helper ---
const inputClass = (hasError: boolean) =>
  `border rounded-lg px-3 py-2 text-sm outline-none transition-colors
   focus:ring-2 focus:ring-blue-500
   ${hasError ? 'border-red-400' : 'border-gray-200'}`

interface EditCategoryFormProps {
  category: Category
  onSuccess?: () => void
  onCancel?: () => void
}

function EditCategoryForm({ category, onSuccess, onCancel }: EditCategoryFormProps) {
  const { categoryDispatch } = useTransactions()
  const nameRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
    name: category.name,
    icon: category.icon,
    color: category.color,
  }
  })

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const { ref, ...rest } = register('name')

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      {/* Name */}
      <Field label="Name" error={errors.name?.message}>
        <input
          {...rest}
          ref={(e) => {
            ref(e)
            nameRef.current = e
          }}
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

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium
                    hover:bg-blue-700 transition-colors mt-2"
        >
          Update Category
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg font-medium border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors mt-2"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditCategoryForm