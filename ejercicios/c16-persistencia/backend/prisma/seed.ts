import { prisma } from "../src/config/prisma";

async function main() {
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();

  await prisma.autor.createMany({
    data: [
      { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francesa" },
      { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
      { nombre: "Julio Cortázar", nacionalidad: "Argentina" }
    ]
  });

  await prisma.libro.createMany({
    data: [
      { titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://example.com/principito.jpg", disponible: true },
      { titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 5000, imagen: "https://example.com/ficciones.jpg", disponible: true },
      { titulo: "Rayuela", autor: "Julio Cortázar", precio: 7000, imagen: "https://example.com/rayuela.jpg", disponible: false }
    ]
  });

  console.log("¡Base de datos sembrada correctamente!");
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
