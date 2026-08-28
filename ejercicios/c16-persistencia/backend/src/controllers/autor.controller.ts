import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export async function getAll(req: Request, res: Response) {
  try {
    const autores = await autorService.findAll();
    return res.json(autores);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los autores" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const autor = await autorService.findById(id);
    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    return res.json(autor);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el autor" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { nombre, nacionalidad } = req.body;

    if (!nombre || !nacionalidad) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoAutor = await autorService.create({ nombre, nacionalidad });
    return res.status(201).json(nuevoAutor);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el autor" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { nombre, nacionalidad } = req.body;
    if (!nombre || !nacionalidad) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const autorActualizado = await autorService.update(id, { nombre, nacionalidad });
    if (!autorActualizado) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    return res.json(autorActualizado);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el autor" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const eliminado = await autorService.remove(id);
    if (!eliminado) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el autor" });
  }
}
