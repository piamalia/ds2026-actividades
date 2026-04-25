"use strict";
let catalogo = [
    { isbn: "1", titulo: "Libro A", autor: "Juan", precio: 100, disponible: true },
    { isbn: "2", titulo: "Libro B", autor: "Ana", precio: 200, disponible: false },
    { isbn: "3", titulo: "Libro C", autor: "Juan", precio: 150, disponible: true }
];
function buscarPorAutor(autor) {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(l => l.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    return libros.reduce((acc, l) => acc + l.precio, 0) / libros.length;
}
function renderizar(libros) {
    const ul = document.getElementById("listado");
    const stats = document.getElementById("stats");
    ul.innerHTML = "";
    libros.forEach(l => {
        const li = document.createElement("li");
        li.textContent = `${l.titulo} - ${l.autor} ($${l.precio})`;
        ul.appendChild(li);
    });
    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${precioPromedio(libros)}`;
}
// BOTONES
document.getElementById("filtrar").addEventListener("click", () => {
    const input = document.getElementById("filtroAutor");
    renderizar(buscarPorAutor(input.value));
});
document.getElementById("mostrarDisponibles").addEventListener("click", () => {
    renderizar(librosDisponibles());
});
document.getElementById("mostrarTodos").addEventListener("click", () => {
    renderizar(catalogo);
});
// Al cargar
renderizar(catalogo);
