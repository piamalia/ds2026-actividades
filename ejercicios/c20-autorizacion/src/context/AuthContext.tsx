import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../services/api";
import { guardarToken, obtenerToken, borrarToken } from "../services/sesion";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: "ADMIN" | "CLIENTE";
}

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (datos: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
  tieneRol: (rol: "ADMIN" | "CLIENTE") => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(obtenerToken() !== null);

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  // Rehidratación al cargar la app
  useEffect(() => {
    if (!obtenerToken()) return;

    apiFetch<Usuario>("/auth/yo")
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  // Escuchador de sesión expirada (401)
  useEffect(() => {
    const manejarExpiracion = () => logout();
    window.addEventListener("sesion-expirada", manejarExpiracion);

    return () => {
      window.removeEventListener("sesion-expirada", manejarExpiracion);
    };
  }, []);

  const login = async (datos: { email: string; password: string }) => {
    interface SesionResponse {
      token: string;
      usuario: Usuario;
    }

    const respuesta = await apiFetch<SesionResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(datos),
    });

    guardarToken(respuesta.token);
    setUsuario(respuesta.usuario);
  };

  const estaAutenticado = usuario !== null;
  const tieneRol = (rol: "ADMIN" | "CLIENTE") => usuario?.rol === rol;

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout, estaAutenticado, tieneRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
