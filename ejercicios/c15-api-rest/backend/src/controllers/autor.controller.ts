import { Request, Response } from 'express';
import * as autorService from '../services/autor.service';

export function getAll(req: Request, res: Response) {
  const autores = autorService.findAll();
  return res.json(autores);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const autor = autorService.findById(id);
  if (!autor) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }
  return res.json(autor);
}

export function create(req: Request, res: Response) {
  const { nombre, nacionalidad } = req.body;
  
  if (!nombre || !nacionalidad) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (nombre, nacionalidad)' });
  }

  const nuevoAutor = autorService.create({ nombre, nacionalidad });
  return res.status(201).json(nuevoAutor);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const { nombre, nacionalidad } = req.body;
  if (!nombre || !nacionalidad) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar' });
  }

  const autorActualizado = autorService.update(id, { nombre, nacionalidad });
  if (!autorActualizado) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  return res.json(autorActualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const eliminado = autorService.remove(id);
  if (!eliminado) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  return res.status(204).send();
}
