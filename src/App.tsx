import { Navigate, Route, Routes } from "react-router";
import { Login } from "./components/Login";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
