import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    apiFetch<T>(url)
      .then((resultado) => {
        if (activo) setData(resultado);
      })
      .catch((err) => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [url]);

  return { data, loading, error };
}
