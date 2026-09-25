import { Rol } from "../generated/prisma";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
        rol: Rol;
      };
    }
  }
}
