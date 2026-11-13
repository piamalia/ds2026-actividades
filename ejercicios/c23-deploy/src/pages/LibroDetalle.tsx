import { useParams } from "react-router-dom";

function LibroDetalle() {

  const { id } = useParams();

  return (
    <div>
      <h1>Detalle del libro</h1>

      <p>El ID recibido es: {id}</p>
    </div>
  );
}

export default LibroDetalle;