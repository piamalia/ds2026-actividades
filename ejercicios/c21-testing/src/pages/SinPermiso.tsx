import React from "react";

export const SinPermiso: React.FC = () => {
  return (
    <div style={{ maxWidth: "500px", margin: "60px auto", padding: "30px", border: "1px solid #f5c6cb", backgroundColor: "#f8d7da" }}> {/* CORTADO: estilo de borde aproximado */}
      <h2>Acceso Denegado (403)</h2>
      <p>No tenés los permisos necesarios para acceder a esta sección de la biblioteca.</p>
      <a href="/" style={{ color: "#721c24", fontWeight: "bold" }}>Volver al inicio</a>
    </div>
  );
};
