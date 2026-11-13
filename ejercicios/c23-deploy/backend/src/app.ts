import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/auth", authRoutes);

// Manejo de 404
app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware global de errores
app.use(errorHandler);

export default app;
