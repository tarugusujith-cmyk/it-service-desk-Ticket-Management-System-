import type { Category } from '../../types/category'
import Badge from '../common/Badge'
import EmptyState from '../common/EmptyState'

interface CategoryTableProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onToggleStatus: (category: Category) => void
}

export default function CategoryTable({ categories, onEdit, onDelete, onToggleStatus }: CategoryTableProps) {
  if (categories.length === 0) {
    return <EmptyState title="No categories yet" description="Add a category so employees can classify their tickets." />
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-ink-100 bg-white shadow-card">
      <table className="min-w-full divide-y divide-ink-100 text-sm">
        <thead className="bg-ink-50/60 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {categories.map((c) => (
            <tr key={c.id} className="hover:bg-ink-50/40">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-700">{c.name}</td>
              <td className="px-4 py-3 text-ink-500">{c.description}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge label={c.status === 'active' ? 'Active' : 'Inactive'} tone={c.status === 'active' ? 'moss' : 'ink'} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onToggleStatus(c)} className="text-xs font-medium text-steel-600 hover:underline">
                    {c.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => onEdit(c)} className="text-xs font-medium text-ink-500 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => onDelete(c)} className="text-xs font-medium text-brick-500 hover:underline">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
