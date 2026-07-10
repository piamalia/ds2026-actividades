import { Container, Row, Col, Button } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import type { Libro } from "../types/Libro";

function Home() {
  const libros: Libro[] = [
    {
      id: 1,
      titulo: "Harry Potter",
      autor: "J.K. Rowling",
      precio: 15000,
      imagen: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
      descripcion: "Novela de magia y aventuras.",
    },
    {
      id: 2,
      titulo: "El Hobbit",
      autor: "J.R.R. Tolkien",
      precio: 18000,
      imagen: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
      descripcion: "Aventura fantástica en la Tierra Media.",
    },
    {
      id: 3,
      titulo: "1984",
      autor: "George Orwell",
      precio: 12000,
      imagen: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      descripcion: "Novela distópica sobre una sociedad totalitaria.",
    },
  ];

  return (
    <>
      <div className="bg-primary text-white text-center p-5">
        <h1>Bienvenido a Mundo Libro</h1>

        <p>Descubrí tus próximas lecturas favoritas</p>

        <Button variant="light">
          Ver catálogo
        </Button>
      </div>

      <Container className="mt-5">
        <Row>
          {libros.map((libro) => (
            <Col md={4} key={libro.id}>
              <LibroCard libro={libro} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;