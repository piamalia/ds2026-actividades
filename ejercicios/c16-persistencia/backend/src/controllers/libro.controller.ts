import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  try {
    const disponibleParam = req.query.disponible;
    let disponible: boolean | undefined = undefined;

    if (disponibleParam === "true") disponible = true;
    if (disponibleParam === "false") disponible = false;

    const libros = await libroService.findAll(disponible);
    return res.json(libros);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los libros" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const libro = await libroService.findById(id);
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    return res.json(libro);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el libro" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { titulo, autor, precio, imagen, disponible } = req.body;

    if (!titulo || !autor || precio === undefined) {
      return res.status(400).json({ error: "Faltan campos obligatorios (titulo, autor, precio)" });
    }

    const nuevoLibro = await libroService.create({
      titulo,
      autor,
      precio: Number(precio),
      imagen: imagen || "",
      disponible: disponible === true || disponible === "true"
    });

    return res.status(201).json(nuevoLibro);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el libro" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { titulo, autor, precio, imagen, disponible } = req.body;
    if (!titulo || !autor || precio === undefined) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const libroActualizado = await libroService.update(id, {
      titulo,
      autor,
      precio: Number(precio),
      imagen: imagen || "",
      disponible: disponible === true || disponible === "true"
    });

    if (!libroActualizado) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    return res.json(libroActualizado);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el libro" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const eliminado = await libroService.remove(id);
    if (!eliminado) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el libro" });
  }
}
