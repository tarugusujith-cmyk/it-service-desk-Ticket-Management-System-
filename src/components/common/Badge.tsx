type Tone = 'steel' | 'moss' | 'amber' | 'brick' | 'ink'

interface BadgeProps {
  label: string
  tone?: Tone
}

const toneClasses: Record<Tone, string> = {
  steel: 'bg-steel-50 text-steel-700 ring-1 ring-inset ring-steel-200',
  moss: 'bg-moss-50 text-moss-600 ring-1 ring-inset ring-moss-400/30',
  amber: 'bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-400/40',
  brick: 'bg-brick-50 text-brick-600 ring-1 ring-inset ring-brick-400/30',
  ink: 'bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200',
}

const statusTone: Record<string, Tone> = {
  Open: 'steel',
  Assigned: 'amber',
  'In Progress': 'amber',
  Pending: 'brick',
  Resolved: 'moss',
  Closed: 'ink',
  Cancelled: 'ink',
}

const priorityTone: Record<string, Tone> = {
  Low: 'steel',
  Medium: 'amber',
  High: 'brick',
  Critical: 'brick',
}

export default function Badge({ label, tone = 'ink' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}>
      {label}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge label={status} tone={statusTone[status] ?? 'ink'} />
}

export function PriorityBadge({ priority }: { priority: string }) {
  return <Badge label={priority} tone={priorityTone[priority] ?? 'ink'} />
}

export function RoleBadge({ role }: { role: string }) {
  const label = role.charAt(0).toUpperCase() + role.slice(1)
  const tone: Tone = role === 'admin' ? 'brick' : role === 'agent' ? 'steel' : 'ink'
  return <Badge label={label} tone={tone} />
}

export function UserStatusBadge({ status }: { status: string }) {
  return <Badge label={status === 'active' ? 'Active' : 'Inactive'} tone={status === 'active' ? 'moss' : 'ink'} />
}
