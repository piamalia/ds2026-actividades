import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../schemas/loginSchema";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorForm(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrorForm(parsed.error.issues[0].message);
      return;
    }

    try {
      await login({ email, password });
      alert("¡Inicio de sesión exitoso!");
      window.location.href = "/";
    } catch (err: any) {
      setErrorForm(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "30px", border: "1px solid #ccc" }}> {/* CORTADO: estilo de borde aproximado */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Iniciar Sesión</h2>

      {errorForm && (
        <div style={{ padding: "10px", backgroundColor: "#ffebeb", color: "red" }}> {/* CORTADO */}
          {errorForm}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label> {/* CORTADO */}
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Contraseña</label> {/* CORTADO */}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white" }}> {/* CORTADO */}
          Ingresar
        </button>
      </form>
    </div>
  );
};
