import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = obtenerToken();
  
  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Inyecta el token Bearer si existe
      ...opciones.headers
    }
  });

  // Previene que se rompa si Express responde con HTML ante un error catastrófico
  const cuerpo = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`); // Mantiene el mensaje real de error del backend
  }

  return cuerpo as T;
}
