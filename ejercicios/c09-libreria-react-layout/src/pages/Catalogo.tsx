import LibroCard from "../components/LibroCard";
import type { Libro } from "../types/Libro";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 15000,
    imagen: "https://picsum.photos/200/300?random=1",
    descripcion: "Un clásico de la literatura.",
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    precio: 18000,
    imagen: "https://picsum.photos/200/300?random=2",
    descripcion: "Novela distópica.",
  },
  {
    id: 3,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    precio: 30000,
    imagen: "https://picsum.photos/200/300?random=3",
    descripcion: "Buenas prácticas de programación.",
  },
];

function Catalogo() {
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
        {libros.map((libro) => (
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