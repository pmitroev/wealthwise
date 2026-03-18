import { useCallback, useState } from 'react'

import AddCategoryForm from '../components/ui/AddCategoryForm'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import CategoryCard from '../components/ui/CategoryCard'
import EditCategoryForm from '../components/ui/EditCategoryForm'
import { useTransactions } from '../context/TransactionContext'
import type { Category } from '../types'

function Categories() {
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleEdit = useCallback(
    (category: Category) => setEditingCategory(category),
    [setEditingCategory]
  )

  const { categories } = useTransactions()

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">🏷️ Categories</h1>
        <Button
          label={showForm ? 'Cancel' : '+ Add Category'}
          onClick={() => {
            setShowForm((prev) => !prev)
            setEditingCategory(null)
          }}
          variant={showForm ? 'ghost' : 'primary'}
        />
      </div>

      {/* Form — conditionally rendered */}
      {showForm && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            New Category
          </h2>
          <AddCategoryForm onSuccess={() => setShowForm(false)} />
        </Card>
      )}

      {/* Category List */}
      {categories.length > 0 ? (
        categories.map((category) =>
          editingCategory?.id === category.id ? (
            <EditCategoryForm
              key={category.id}
              category={category}
              onCancel={() => setEditingCategory(null)}
              onSuccess={() => setEditingCategory(null)}
            />
          ) : (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
            />
          )
        )
      ) : (
        <p className="text-sm text-gray-500">There aren't any categories</p>
      )}
    </div>
  )
}

export default Categories
