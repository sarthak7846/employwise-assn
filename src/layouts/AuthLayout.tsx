import { Navigate, Outlet } from "react-router";

export const AuthLayout = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
