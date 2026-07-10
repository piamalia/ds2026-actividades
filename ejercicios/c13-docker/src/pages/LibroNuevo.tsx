
import { Form, Button } from "react-bootstrap";
import { libroSchema } from "../schemas/libroSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LibroValidado } from "../schemas/libroSchema";
import { useNavigate } from "react-router-dom";

function LibroNuevo() {
  const navigate = useNavigate();
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LibroValidado>({
  resolver: zodResolver(libroSchema),
});

function onSubmit(data: LibroValidado) {
  console.log(data);

  alert("Libro agregado correctamente");

  navigate("/catalogo");
}

  return (
    <>
      <h1>Nuevo Libro</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>

          <Form.Control
          {...register("titulo")}
          isInvalid={!!errors.titulo}
        />

        <Form.Control.Feedback type="invalid">
          {errors.titulo?.message}
        </Form.Control.Feedback>

        </Form.Group>

        <Form.Group className="mb-3">
  <Form.Label>Autor</Form.Label>

  <Form.Control
    {...register("autor")}
    isInvalid={!!errors.autor}
  />

  <Form.Control.Feedback type="invalid">
    {errors.autor?.message}
  </Form.Control.Feedback>
</Form.Group>

      <Form.Group className="mb-3">
  <Form.Label>Precio</Form.Label>

  <Form.Control
    type="number"
    {...register("precio")}
    isInvalid={!!errors.precio}
  />

  <Form.Control.Feedback type="invalid">
    {errors.precio?.message}
  </Form.Control.Feedback>
</Form.Group>
        <Form.Group className="mb-3">
  <Form.Label>Descripción</Form.Label>

  <Form.Control
    as="textarea"
    rows={3}
    {...register("descripcion")}
    isInvalid={!!errors.descripcion}
  />

  <Form.Control.Feedback type="invalid">
    {errors.descripcion?.message}
  </Form.Control.Feedback>
</Form.Group>
        <Button type="submit">
          Guardar
        </Button>
      </Form>
    </>
  );
}

export default LibroNuevo;