import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  rol?: "ADMIN" | "CLIENTE";
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ rol }) => {
  const { usuario, cargando, tieneRol } = useAuth();

  if (cargando) {
    return <div style={{ textAlign: "center", padding: "40px", fontFamily: "sans-serif" }}>Cargando...</div>; // CORTADO: verificar texto exacto
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rol && !tieneRol(rol)) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
};
