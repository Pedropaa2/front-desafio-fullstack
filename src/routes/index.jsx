import { Routes, Route } from "react-router-dom";

import { Register } from "../pages/Register";
import { Dash } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";

function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dash />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export { RoutesMain };
