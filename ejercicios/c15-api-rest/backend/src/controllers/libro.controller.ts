import { Request, Response } from 'express';
import * as libroService from '../services/libro.service';

export function getAll(req: Request, res: Response) {
  const disponibleParam = req.query.disponible;
  let disponible: boolean | undefined = undefined;
  
  if (disponibleParam === 'true') disponible = true;
  if (disponibleParam === 'false') disponible = false;

  const libros = libroService.findAll(disponible);
  return res.json(libros);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const libro = libroService.findById(id);
  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
  return res.json(libro);
}

export function create(req: Request, res: Response) {
  const { titulo, autor, precio, imagen, disponible } = req.body;
  
  if (!titulo || !autor || precio === undefined) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (titulo, autor, precio)' });
  }

  const nuevoLibro = libroService.create({
    titulo,
    autor,
    precio: Number(precio),
    imagen: imagen || '',
    disponible: disponible === true || disponible === 'true'
  });

  return res.status(201).json(nuevoLibro);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const { titulo, autor, precio, imagen, disponible } = req.body;
  if (!titulo || !autor || precio === undefined) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar' });
  }

  const libroActualizado = libroService.update(id, {
    titulo,
    autor,
    precio: Number(precio),
    imagen: imagen || '',
    disponible: disponible === true || disponible === 'true'
  });

  if (!libroActualizado) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  return res.json(libroActualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const eliminado = libroService.remove(id);
  if (!eliminado) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  return res.status(204).send();
}
