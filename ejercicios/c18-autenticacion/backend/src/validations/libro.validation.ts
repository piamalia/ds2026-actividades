import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  precio: z.number().int().positive("El precio debe ser un número entero positivo"),
  imagen: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  disponible: z.boolean().default(true),
  autorId: z.number().int().positive("El autorId es obligatorio y debe ser un ID válido"),
  categoriasIds: z.array(z.number().int().positive()).optional()
});

export const libroUpdateSchema = libroCreateSchema;
