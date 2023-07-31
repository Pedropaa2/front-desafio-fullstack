import { Routes, Route } from "react-router-dom";

import { Register } from "../pages/Register";
import { Dash } from "../pages/Dashboard";
import { Login } from "../pages/Login";

function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dash />} />
    </Routes>
  );
}
export { RoutesMain };
