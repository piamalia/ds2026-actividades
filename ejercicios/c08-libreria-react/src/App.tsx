import { useState } from "react";
import { Container, Navbar, Nav, Button, Card, Row, Col } from "react-bootstrap";

interface LibroProps {
  titulo: string;
  autor: string;
  imagen: string;
}

function LibroCard({ titulo, autor, imagen }: LibroProps) {

  const [likes, setLikes] = useState(0);

  return (
    <Card className="mb-4 shadow">
      <Card.Img variant="top" src={imagen} />

      <Card.Body>
        <Card.Title>{titulo}</Card.Title>

        <Card.Text>
          {autor}
        </Card.Text>

        <Button
          variant="primary"
          onClick={() => setLikes(likes + 1)}
        >
          ❤️ Me gusta ({likes})
        </Button>
      </Card.Body>
    </Card>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-5">
      <p>Mundo Libro - 2026</p>
    </footer>
  );
}

function App() {

  const libros = [
    {
      titulo: "Harry Potter",
      autor: "J.K Rowling",
      imagen: "https://covers.openlibrary.org/b/id/7984916-L.jpg"
    },
    {
      titulo: "El Hobbit",
      autor: "Tolkien",
      imagen: "https://covers.openlibrary.org/b/id/6979861-L.jpg"
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      imagen: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    }
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Mundo Libro</Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link>Inicio</Nav.Link>
            <Nav.Link>Catálogo</Nav.Link>
            <Nav.Link>Contacto</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="bg-primary text-white text-center p-5">
        <h1>Bienvenido a Mundo Libro</h1>

        <p>
          Descubrí tus próximas lecturas favoritas
        </p>

        <Button variant="light">
          Ver catálogo
        </Button>
      </div>

      <Container className="mt-5">

        <Row>

          {libros.map((libro, index) => (

            <Col md={4} key={index}>

              <LibroCard
                titulo={libro.titulo}
                autor={libro.autor}
                imagen={libro.imagen}
              />

            </Col>

          ))}

        </Row>

      </Container>

      <Footer />
    </>
  );
}

export default App;