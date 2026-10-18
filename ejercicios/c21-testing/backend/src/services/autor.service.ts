import { prisma } from "../config/prisma";
import { Autor } from "../types/autor.types";

export async function findAll(): Promise<Autor[]> {
  return prisma.autor.findMany();
}

export async function findById(id: number): Promise<Autor | null> {
  return prisma.autor.findUnique({
    where: { id }
  });
}

export async function create(datos: Omit<Autor, "id">): Promise<Autor> {
  return prisma.autor.create({
    data: datos
  });
}

export async function update(id: number, datos: Omit<Autor, "id">): Promise<Autor | null> {
  try {
    return await prisma.autor.update({
      where: { id },
      data: datos
    });
  } catch {
    return null;
  }
}

export async function remove(id: number): Promise<boolean> {
  try {
    await prisma.autor.delete({
      where: { id }
    });
    return true;
  } catch {
    return false;
  }
}
