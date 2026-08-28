import express from 'express';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';

const app = express();
const PORT = 3000;

// Middleware obligatorio para poder leer JSON en req.body (POST/PUT)
app.use(express.json());

// Montamos las rutas relativas en sus prefijos globales
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de la Librería corriendo en http://localhost:${PORT}`);
});
