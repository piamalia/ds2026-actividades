import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { AuthContext, type Usuario } from "../context/AuthContext";

afterEach(() => {
	cleanup();
});

function renderHeader(usuario: Usuario | null) {
  const authMock = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: "ADMIN" | "CLIENTE") => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={authMock}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe("Header", () => {
  it("sin sesión: muestra 'Ingresar' y NO muestra '+ Nuevo libro'", () => {
    renderHeader(null);
    expect(screen.getByText("Ingresar")).toBeInTheDocument();
    expect(screen.queryByText(/nuevo libro/i)).not.toBeInTheDocument();
  });

  it("CLIENTE: saluda por nombre y NO ve '+ Nuevo libro'", () => {
    renderHeader({
      id: 2,
      email: "cliente@libreria.test",
      nombre: "Cliente",
      rol: "CLIENTE",
    });
    expect(screen.getByText(/Hola/i)).toBeInTheDocument();
    expect(screen.queryByText(/nuevo libro/i)).not.toBeInTheDocument();
    expect(screen.getByText("Salir")).toBeInTheDocument();
  });

  it("ADMIN: ve el link '+ Nuevo libro'", () => {
    renderHeader({
      id: 1,
      email: "admin@libreria.test",
      nombre: "Admin",
      rol: "ADMIN",
    });
    expect(screen.getByRole("link", { name: /nuevo libro/i })).toBeInTheDocument();
    expect(screen.getByText("Salir")).toBeInTheDocument();
  });
});
