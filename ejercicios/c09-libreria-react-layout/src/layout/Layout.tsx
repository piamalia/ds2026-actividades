import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

function Layout() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Librería React</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/catalogo">
              Catálogo
            </Nav.Link>

            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>

      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px",
          background: "#f8f9fa",
        }}
      >
        UTN - Desarrollo de Software
      </footer>
    </>
  );
}

export default Layout;