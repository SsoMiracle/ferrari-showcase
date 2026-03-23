import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, authChecked } = useAppSelector(
    (state) => state.auth,
  );

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
