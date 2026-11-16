import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Spinner from '../ui/Spinner'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size={28} />
      </div>
    )
  }

  if (!user) {
    // Remember where they wanted to go, so we can send them back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}