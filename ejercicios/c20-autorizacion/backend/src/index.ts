import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

// Quitamos la librería de CORS porque estamos trabajando offline.
// El redireccionamiento lo va a resolver el proxy de Vite en el frontend.
app.use(express.json());

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/auth", authRoutes);

// Middleware 404 en formato JSON
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador global de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor de la Librería corriendo en http://localhost:${PORT}`);
});
