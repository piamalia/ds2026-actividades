import { prisma } from "../config/prisma";
import { Rol } from "../generated/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_por_defecto_123";

export interface UsuarioPublico {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}

export async function findById(id: number): Promise<UsuarioPublico | null> {
  return prisma.usuario.findUnique({
    where: { id },
    select: { id: true, email: true, nombre: true, rol: true }
  });
}

export async function registrar(datos: any): Promise<UsuarioPublico> {
  const hash = await bcrypt.hash(datos.password, 10);
  return prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash: hash
    },
    select: { id: true, email: true, nombre: true, rol: true } // Nunca retornar el hash
  });
}

export async function login(datos: any): Promise<{ token: string; usuario: UsuarioPublico } | null> {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email }
  });

  if (!usuario) return null;

  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null;

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol
    }
  };
}
