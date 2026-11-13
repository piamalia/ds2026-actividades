import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

describe("POST /api/libros (permisos y validación sin DB)", () => {
  it("sin token → responde 401", async () => {
    const res = await request(app).post("/api/libros").send({});
    expect(res.status).toBe(401);
  });

  it("con token de CLIENTE → responde 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({ titulo: "Libro de prueba", precio: 5000, autorId: 1 });
    expect(res.status).toBe(403);
  });

  it("ADMIN con body inválido → responde 400 y no 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: -5 });
    expect(res.status).toBe(400);
  });
});
