import { Navigate, Outlet } from "react-router-dom";
import { routeForRole, type UserRole, useAuth } from "../auth/AuthContext";

export function ProtectedRoute({ allowedRoles }: { allowedRoles?: UserRole[] }) {
  const { isReady, session } = useAuth();

  if (!isReady) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-700">
        <p className="text-sm font-medium">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && (!session.user.role || !allowedRoles.includes(session.user.role))) {
    return <Navigate to={routeForRole(session.user.role)} replace />;
  }

  return <Outlet />;
}
