import { Prisma } from "../generated/prisma";
import { prisma } from "../config/prisma";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{ include: { autor: true; categorias: true } }>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  const where: Prisma.LibroWhereInput = {};
  if (disponible !== undefined) {
    where.disponible = disponible;
  }
  return prisma.libro.findMany({
    where,
    include: { autor: true }
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true }
  });
}

export async function create(datos: { titulo: string; precio: number; imagen: string; disponible: boolean; autorId: number; categoriasIds?: number[] }): Promise<LibroDetalle> {
  const { categoriasIds, ...rest } = datos;
  return prisma.libro.create({
    data: {
      ...rest,
      categorias: categoriasIds ? { connect: categoriasIds.map(id => ({ id })) } : undefined
    },
    include: { autor: true, categorias: true }
  });
}

export async function update(id: number, datos: { titulo: string; precio: number; imagen: string; disponible: boolean; autorId: number; categoriasIds?: number[] }): Promise<LibroDetalle | null> {
  const { categoriasIds, ...rest } = datos;
  return prisma.libro.update({
    where: { id },
    data: {
      ...rest,
      categorias: categoriasIds ? { set: categoriasIds.map(id => ({ id })) } : undefined
    },
    include: { autor: true, categorias: true }
  });
}

export async function remove(id: number): Promise<boolean> {
  await prisma.libro.delete({
    where: { id }
  });
  return true;
}

