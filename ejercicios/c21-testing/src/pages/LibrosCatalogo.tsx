import React from "react";
import { useFetch } from "../hooks/useFetch";
import { LibroCard } from "../components/LibroCard";
import type { LibroCardProps } from "../types/libroCardProps";

export const LibrosCatalogo: React.FC = () => {
  // Consumimos el endpoint público real de nuestro Express
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>("/libros");

  if (loading) return <p style={{ textAlign: "center", padding: "40px" }}>Cargando nuestro catálogo de libros...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", padding: "40px" }}>Error al conectar con la API: {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Catálogo Disponible (Datos en tiempo real)</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {libros?.map((libro) => (
          <LibroCard key={libro.id} {...libro} />
        ))}
      </div>
    </div>
  );
};
