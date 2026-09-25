import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Login } from "./pages/Login";
import { LibroNuevo } from "./pages/LibroNuevo";
import { SinPermiso } from "./pages/SinPermiso";
import { PrivateRoute } from "./components/PrivateRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />

          {/* Ruta protegida solo para ADMIN */}
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>

          <Route path="*" element={<h2 style={{ textAlign: "center", padding: "40px" }}>Página no encontrada</h2>} /> {/* CORTADO: contenido de la ruta 404 no visible en la captura */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
