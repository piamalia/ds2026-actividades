import express from "express";

const app = express();
const PORT = 3000;


interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}


const libros: Libro[] = [
  {
    id: 1,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 12000,
    imagen: "principito.jpg",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 18000,
    imagen: "cien.jpg",
    disponible: true,
  },
  {
    id: 3,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    precio: 20000,
    imagen: "quijote.jpg",
    disponible: false,
  },
];


app.get("/", (_req, res) => {
  res.json({
    mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳",
  });
});


app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
