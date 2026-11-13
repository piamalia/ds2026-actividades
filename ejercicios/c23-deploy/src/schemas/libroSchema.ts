import { z } from "zod";

export const libroSchema = z.object({
  titulo: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  autor: z.string().min(3, "El autor debe tener al menos 3 caracteres"),
  precio: z.coerce.number().positive("El precio debe ser mayor a 0"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
});

export type LibroValidado = z.input<typeof libroSchema>;