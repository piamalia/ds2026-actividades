interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  precio: number;
  disponible: boolean;
}

let catalogo: Libro[] = [
  { isbn: "1", titulo: "Libro A", autor: "Juan", precio: 100, disponible: true },
  { isbn: "2", titulo: "Libro B", autor: "Ana", precio: 200, disponible: true }
];

function renderizar(): void {
  const ul = document.getElementById("listado") as HTMLUListElement;
  ul.innerHTML = "";

  catalogo.forEach(l => {
    const li = document.createElement("li");

    li.textContent = `${l.titulo} - ${l.autor} ($${l.precio}) `;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => eliminarLibro(l.isbn);

    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function agregarLibro(libro: Libro): void {
  catalogo.push(libro);
  renderizar();
}

function eliminarLibro(isbn: string): void {
  catalogo = catalogo.filter(l => l.isbn !== isbn);
  renderizar();
}

function validarFormulario(): Libro | null {
  const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
  const autor = (document.getElementById("autor") as HTMLInputElement).value;
  const precio = Number((document.getElementById("precio") as HTMLInputElement).value);
  const error = document.getElementById("errorForm") as HTMLElement;

  if (!titulo || !autor || precio <= 0) {
    error.textContent = "Datos inválidos";
    return null;
  }

  error.textContent = "";

  return {
    isbn: "AUTO-" + Date.now(),
    titulo,
    autor,
    precio,
    disponible: true
  };
}

window.onload = () => {

  renderizar();

  document.getElementById("agregar")!.addEventListener("click", () => {
    const libro = validarFormulario();

    if (libro) {
      agregarLibro(libro);
    }
  });

};