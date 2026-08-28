import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Libro } from "../types/Libro";

type Props = {
  libro: Libro;
};

function LibroCard({ libro }: Props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={libro.imagen} />

      <Card.Body>

        <Card.Title>
          {libro.titulo}
        </Card.Title>

        <Card.Text>
          {libro.autor}
        </Card.Text>

        <Card.Text>
          ${libro.precio}
        </Card.Text>

        <Link to={`/libros/${libro.id}`}>
            <Button>
                Ver detalle
            </Button>
        </Link>

      </Card.Body>
    </Card>
  );
}

export default LibroCard;