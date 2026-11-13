import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export async function getAll(_req: Request, res: Response) {
  const autores = await autorService.findAll();
  return res.json(autores);
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id as any as number;
  const autor = await autorService.findById(id);
  if (!autor) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }
  return res.json(autor);
}

export async function create(req: Request, res: Response) {
  const nuevoAutor = await autorService.create(req.body);
  return res.status(201).json(nuevoAutor);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as any as number;
  const autorActualizado = await autorService.update(id, req.body);
  return res.json(autorActualizado);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id as any as number;
  await autorService.remove(id);
  return res.status(204).send();
}
