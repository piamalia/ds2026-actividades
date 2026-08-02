import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Error al cargar los datos");
        }

        const datos = await res.json();
        setData(datos);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [url]);

  return { data, loading, error };
}