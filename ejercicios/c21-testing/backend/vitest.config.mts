import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

const env = loadEnv("test", process.cwd(), "");

export default defineConfig({
	test: {
		env: {
			JWT_SECRET: "secreto-super-seguro-utn-ds26",
			DATABASE_URL: env.DATABASE_URL ?? "postgresql://
	postgres:postgres@db:5432/libreria_db?schema=public",
		},
	},
});
