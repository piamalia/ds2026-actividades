import { prisma } from "../src/config/prisma";

async function main() {
  // Limpiamos los datos anteriores por si acaso
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
  await prisma.categoria.deleteMany();

  // 1. Sembramos los autores primero
  const autor1 = await prisma.autor.create({
    data: { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francesa" }
  });
  const autor2 = await prisma.autor.create({
    data: { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" }
  });
  const autor3 = await prisma.autor.create({
    data: { nombre: "Julio Cortázar", nacionalidad: "Argentina" }
  });

  // 2. Sembramos las categorías
  const catNovela = await prisma.categoria.create({
    data: { nombre: "Novela" }
  });
  const catEnsayo = await prisma.categoria.create({
    data: { nombre: "Ensayo" }
  });
  const catFiccion = await prisma.categoria.create({
    data: { nombre: "Ficción" }
  });

  // 3. Sembramos los libros relacionándolos sin IDs hardcodeados
  await prisma.libro.create({
    data: {
      titulo: "El principito",
      precio: 4500,
      imagen: "https://example.com/principito.jpg",
      disponible: true,
      autor: { connect: { id: autor1.id } },
      categorias: { connect: [{ id: catNovela.id }, { id: catFiccion.id }] }
    }
  });

  await prisma.libro.create({
    data: {
      titulo: "Ficciones",
      precio: 5000,
      imagen: "https://example.com/ficciones.jpg",
      disponible: true,
      autor: { connect: { id: autor2.id } },
      categorias: { connect: [{ id: catFiccion.id }, { id: catEnsayo.id }] }
    }
  });

  await prisma.libro.create({
    data: {
      titulo: "Rayuela",
      precio: 7000,
      imagen: "https://example.com/rayuela.jpg",
      disponible: false,
      autor: { connect: { id: autor3.id } },
      categorias: { connect: [{ id: catNovela.id }] }
    }
  });

  console.log("¡Base de datos sembrada correctamente con relaciones!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
