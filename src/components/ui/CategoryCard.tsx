import { useTransactions } from '../../context/TransactionContext'
import type { Category } from '../../types'

import Button from './Button'
import Card from './Card'

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
}

function CategoryCard({ category, onEdit }: CategoryCardProps) {
  const { categoryDispatch } = useTransactions()

  return (
    <Card>
      <div className="flex items-center justify-between">
        {/* Icon + Name */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          <span className="text-lg">{category.name}</span>
          <div
            className="w-5 h-5 border border-gray-200 rounded-full"
            style={{ backgroundColor: category.color }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <Button
            label="Edit"
            variant="primary"
            onClick={() => onEdit(category)}
          />
          <Button
            label="Delete"
            variant="ghost"
            onClick={() =>
              categoryDispatch({
                type: 'DELETE_CATEGORY',
                payload: category.id,
              })
            }
          />
        </div>
      </div>
    </Card>
  )
}

export default CategoryCard
