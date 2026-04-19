import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="gy-card">Checking authentication...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  return children;
}
