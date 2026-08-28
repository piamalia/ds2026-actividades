import { Spinner, Alert } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import { useFetch } from "../hooks/useFetch";
import type { Libro } from "../types/Libro";

function Catalogo() {
  const {
    data: libros,
    loading,
    error,
  } = useFetch<Libro[]>("/libros.json");

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h1>Catálogo</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {(libros ?? []).map((libro) => (
          <LibroCard
            key={libro.id}
            libro={libro}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalogo;