import React, { useState } from "react";
import { apiFetch } from "../services/api";

export const LibroNuevo: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [autorId, setAutorId] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Mandamos los datos. apiFetch va a inyectar el Bearer Token automáticamente
      await apiFetch("/libros", {
        method: "POST",
        body: JSON.stringify({
          titulo,
          precio: Number(precio),
          imagen,
          disponible,
          autorId: Number(autorId),
          categoriasIds: [] // Modificá según tus necesidades
        })
      });
      alert("¡Libro agregado correctamente al catálogo real!");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message); // Te dirá "No autenticado" (401) o "No autorizado" (403) si no sos ADMIN
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Agregar Nuevo Libro</h2>
      
      {error && (
        <div style={{ padding: "10px", backgroundColor: "#ffebeb", color: "red", borderRadius: "5px", marginBottom: "15px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px" }}>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px" }}>Precio:</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px" }}>URL Imagen:</label>
          <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px" }}>ID de Autor (Debe existir en la base):</label>
          <input type="number" value={autorId} onChange={(e) => setAutorId(Number(e.target.value))} style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} required />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} /> Disponible
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}>
          Guardar Libro en la Base
        </button>
      </form>
    </div>
  );
};
