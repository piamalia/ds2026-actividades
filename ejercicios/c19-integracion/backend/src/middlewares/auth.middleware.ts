import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Rol } from "../generated/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_por_defecto_123";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autenticado. Token requerido" });
  }

  const token = authHeader.split(" ")[7];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.usuario = {
      id: payload.id,
      email: payload.email,
      rol: payload.rol as Rol
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

export function authorize(...rolesPermitidos: Rol[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ error: "No autenticado" });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No autorizado. Permisos insuficientes" });
    }

    next();
  };
}
