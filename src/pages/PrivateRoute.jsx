import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function PrivateRoute({ allowedRoles }) {
    const { role, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

    return <Outlet />;
}
