import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  allowedRoles?: ('manager' | 'tenant')[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    // If not authenticated, redirect to role selection or a common login
    return <Navigate to="/auth-choice" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If authenticated but role doesn't match, redirect to their respective dashboard
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};
