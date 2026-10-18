import type { SignOptions } from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "secreto-super-seguro-utn-ds26";
export const JWT_EXPIRES_IN: SignOptions["expiresIn"] = "2h";
export const SALT_ROUNDS = 10;
