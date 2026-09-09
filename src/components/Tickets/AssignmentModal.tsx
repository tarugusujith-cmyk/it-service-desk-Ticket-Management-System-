import { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import type { User } from '../../types/user'
import { getUsers } from '../../services/userService'

interface AssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  currentAgentId: string
  onAssign: (agent: User) => void | Promise<void>
}

export default function AssignmentModal({ isOpen, onClose, currentAgentId, onAssign }: AssignmentModalProps) {
  const [agents, setAgents] = useState<User[]>([])
  const [selected, setSelected] = useState(currentAgentId)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setSelected(currentAgentId)
    setLoading(true)
    getUsers()
      .then((users) => setAgents(users.filter((u) => u.role === 'agent' && u.status === 'active')))
      .finally(() => setLoading(false))
  }, [isOpen, currentAgentId])

  async function handleConfirm() {
    const agent = agents.find((a) => a.id === selected)
    if (!agent) return
    setSaving(true)
    try {
      await onAssign(agent)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      title="Assign ticket"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={saving || !selected}
            className="rounded-md bg-steel-500 px-4 py-2 text-sm font-medium text-white hover:bg-steel-600 disabled:opacity-50"
          >
            {saving ? 'Assigning…' : 'Confirm assignment'}
          </button>
        </>
      }
    >
      {loading ? (
        <p className="text-sm text-ink-400">Loading available agents…</p>
      ) : agents.length === 0 ? (
        <p className="text-sm text-ink-400">No active support agents available.</p>
      ) : (
        <div className="space-y-2">
          {agents.map((a) => (
            <label
              key={a.id}
              className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-2.5 text-sm ${
                selected === a.id ? 'border-steel-500 bg-steel-50' : 'border-ink-200 hover:bg-ink-50'
              }`}
            >
              <div>
                <p className="font-medium text-ink-700">{a.fullName}</p>
                <p className="text-xs text-ink-400">{a.department}</p>
              </div>
              <input
                type="radio"
                name="agent"
                checked={selected === a.id}
                onChange={() => setSelected(a.id)}
              />
            </label>
          ))}
        </div>
      )}
    </Modal>
  )
}
