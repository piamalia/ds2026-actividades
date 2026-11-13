import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  const disponibleParam = req.query.disponible;
  let disponible: boolean | undefined = undefined;

  if (disponibleParam === "true") disponible = true;
  if (disponibleParam === "false") disponible = false;

  const libros = await libroService.findAll(disponible);
  return res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id as any as number;
  const libro = await libroService.findById(id);
  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevoLibro = await libroService.create(req.body);
  return res.status(201).json(nuevoLibro);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as any as number;
  const libroActualizado = await libroService.update(id, req.body);
  return res.json(libroActualizado);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id as any as number;
  await libroService.remove(id);
  return res.status(204).send();
}
