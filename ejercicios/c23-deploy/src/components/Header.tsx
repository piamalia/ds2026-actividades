import React from "react";
import { useAuth } from "../context/AuthContext";

export const Header: React.FC = () => {
  const { usuario, logout, tieneRol } = useAuth();

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", backgroundColor: "#343a40", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <a href="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}> Libreria DS26</a>
        <a href="/" style={{ color: "#ccc", textDecoration: "none" }}>Catálogo</a>

        {/* Solo el ADMIN ve la opción de agregar un nuevo libro */}
        {tieneRol("ADMIN") && (
          <a href="/libros/nuevo" style={{ color: "#ffc107", textDecoration: "none", fontWeight: "bold" }}> +Nuevo Libro</a>
        )}
      </div>

      <div>
        {usuario ? (
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <span>Hola, <strong>{usuario.nombre}</strong> ({usuario.rol})</span>
            <button onClick={logout} style={{ padding: "6px 12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Salir
            </button>
          </div>
        ) : (
          <a href="/login" style={{ padding: "6px 12px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Ingresar
          </a>
        )}
      </div>
    </nav>
  );
};
