import React, { useState } from "react";
import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";
import { loginSchema } from "../schemas/loginSchema";

interface SesionResponse {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    email: string;
    rol: "ADMIN" | "CLIENTE";
  };
}

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorForm(null);

    // 1. Validamos en el front con Zod antes de mandar la petición
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      // Accedemos de forma segura al mensaje del primer error  usando .issues
      setErrorForm(parsed.error.issues[0].message);
      return;
    }

    try {
      // 2. Ejecutamos la petición POST real a Express
      const respuesta = await apiFetch<SesionResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      // 3. Guardamos el token de forma persistente
      guardarToken(respuesta.token);
      alert(`¡Hola ${respuesta.usuario.nombre}! Iniciaste sesión como ${respuesta.usuario.rol}`);
      window.location.href = "/"; // Redirecciona de forma simple a la home
    } catch (err: any) {
      setErrorForm(err.message); // Muestra el error real devuelto por tu servidor de Express
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "10px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Iniciar Sesión</h2>
      
      {errorForm && (
        <div style={{ padding: "10px", backgroundColor: "#ffebeb", color: "red", borderRadius: "5px", marginBottom: "15px", fontSize: "14px" }}>
          {errorForm}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

