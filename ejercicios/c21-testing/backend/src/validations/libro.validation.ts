import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio"),
  precio: z.number().int().positive("El precio debe ser un número entero positivo"),
  imagen: z.string().url("Debe ser una URL válida"),
  autorId: z.number().int().positive("El autorId es obligatorio y debe ser un ID válido"),
});

export const libroUpdateSchema = libroCreateSchema.partial();

export const idParamSchema = z.object({
	id: z.coerce.number().int().positive("ID invalido"),
});
