import React from "react";
import { useFetch } from "../hooks/useFetch";
import { LibroCard } from "../components/LibroCard";
import type { LibroCardProps } from "../types/libroCardProps";

export const Home: React.FC = () => {
  // Consumimos el endpoint público real de nuestro Express
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>("/libros");

  if (loading) return <p style={{ textAlign: "center", padding: "40px" }}>Cargando novedades...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", padding: "40px" }}>Error: {error}</p>;

  // Mostramos los últimos 3 libros agregados o novedades
  const novedades = libros ? libros.slice(-3) : [];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#f8f9fa", borderRadius: "8px", marginBottom: "30px" }}>
        <h1>¡Bienvenido a la Librería Real!</h1>
        <p style={{ fontSize: "18px", color: "#666" }}>Conectada en tiempo real a PostgreSQL con Prisma y Express</p>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Últimas Novedades</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {novedades.map((libro) => (
          <LibroCard key={libro.id} {...libro} />
        ))}
      </div>
    </div>
  );
};
