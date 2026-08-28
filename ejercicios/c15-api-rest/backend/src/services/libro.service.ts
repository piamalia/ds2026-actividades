import { Libro } from '../types/libro.types';

const libros: Libro[] = [
  { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://example.com/principito.jpg", disponible: true },
  { id: 2, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 5000, imagen: "https://example.com/ficciones.jpg", disponible: true },
  { id: 3, titulo: "Rayuela", autor: "Julio Cortázar", precio: 7000, imagen: "https://example.com/rayuela.jpg", disponible: false }
];
let proximoId = 4;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter(l => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(l => l.id === id);
}

export function create(datos: Omit<Libro, 'id'>): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, 'id'>): Libro | undefined {
  const indice = libros.findIndex(l => l.id === id);
  if (indice === -1) return undefined;
  libros[indice] = { id, ...datos };
  return libros[indice];
}

export function remove(id: number): boolean {
  const indice = libros.findIndex(l => l.id === id);
  if (indice === -1) return false;
  libros.splice(indice, 1);
  return true;
}
