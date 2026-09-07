import React from "react";
import type { LibroCardProps } from "../types/libroCardProps";

export const LibroCard: React.FC<LibroCardProps> = ({ titulo, precio, imagen, disponible, autor }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", margin: "10px", borderRadius: "8px", maxWidth: "200px", fontFamily: "sans-serif" }}>
      <img src={imagen} alt={titulo} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "4px" }} />
      <h3 style={{ fontSize: "18px", margin: "10px 0 5px 0" }}>{titulo}</h3>
      <p style={{ margin: "0 0 5px 0", color: "#555" }}><strong>Autor:</strong> {autor.nombre}</p> {/* Acceso al objeto relacional */}
      <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>Precio: ${precio}</p>
      <span style={{ color: disponible ? "green" : "red", fontWeight: "bold" }}>
        {disponible ? "Disponible" : "Sin Stock"}
      </span>
    </div>
  );
};
