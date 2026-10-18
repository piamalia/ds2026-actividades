export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface LibroCardProps {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  autor: Autor; // Ahora es una relación estructurada
}
