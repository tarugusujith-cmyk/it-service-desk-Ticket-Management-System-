import { useState, type FormEvent } from 'react'
import type { Role, User, UserStatus } from '../../types/user'
import { isRequired, isValidEmail, isValidPhone, type FieldErrors } from '../../utils/validators'

interface UserFormProps {
  initial?: User
  onSubmit: (input: Omit<User, 'id' | 'createdDate'>) => void | Promise<void>
  onCancel: () => void
}

const roles: Role[] = ['admin', 'agent', 'employee']

export default function UserForm({ initial, onSubmit, onCancel }: UserFormProps) {
  const [fullName, setFullName] = useState(initial?.fullName ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [phone, setPhone] = useState(initial?.phone ?? '')
  const [department, setDepartment] = useState(initial?.department ?? '')
  const [role, setRole] = useState<Role>(initial?.role ?? 'employee')
  const [status, setStatus] = useState<UserStatus>(initial?.status ?? 'active')
  const [password, setPassword] = useState(initial?.password ?? '')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [saving, setSaving] = useState(false)

  function validate(): boolean {
    const next: FieldErrors = {}
    if (!isRequired(fullName)) next.fullName = 'Full name is required.'
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.'
    if (!isValidPhone(phone)) next.phone = 'Enter a valid 10-digit phone number.'
    if (!isRequired(department)) next.department = 'Department is required.'
    if (!initial && !isRequired(password)) next.password = 'Set a temporary password.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await onSubmit({ fullName, email, phone, department, role, status, password })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-100" />
          {errors.fullName && <p className="mt-1 text-xs text-brick-500">{errors.fullName}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-100" />
          {errors.email && <p className="mt-1 text-xs text-brick-500">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-100" />
          {errors.phone && <p className="mt-1 text-xs text-brick-500">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Department</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-100" />
          {errors.department && <p className="mt-1 text-xs text-brick-500">{errors.department}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-100">
            {roles.map((r) => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as UserStatus)} className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-100">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink-600">
          {initial ? 'Password' : 'Temporary password'}
        </label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-100" />
        {errors.password && <p className="mt-1 text-xs text-brick-500">{errors.password}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="rounded-md bg-steel-500 px-4 py-2 text-sm font-medium text-white hover:bg-steel-600 disabled:opacity-60">
          {saving ? 'Saving…' : initial ? 'Save changes' : 'Add user'}
        </button>
      </div>
    </form>
  )
}
