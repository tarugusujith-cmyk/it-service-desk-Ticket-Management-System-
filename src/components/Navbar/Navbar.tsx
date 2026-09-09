import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { RoleBadge } from '../common/Badge'

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-ink-100 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-ink-500 hover:bg-ink-50 md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
        <h1 className="text-sm font-semibold text-ink-700 md:text-base">
          {user?.role === 'admin' && 'Admin Overview'}
          {user?.role === 'agent' && 'Support Workspace'}
          {user?.role === 'employee' && 'My Support Space'}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {user && <RoleBadge role={user.role} />}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-ink-50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-steel-100 text-sm font-semibold text-steel-700">
            {user?.fullName.charAt(0)}
          </div>
          <span className="hidden text-sm font-medium text-ink-600 sm:inline">{user?.fullName}</span>
        </button>
        <button
          onClick={handleLogout}
          className="rounded-md border border-ink-200 px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-ink-50"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
