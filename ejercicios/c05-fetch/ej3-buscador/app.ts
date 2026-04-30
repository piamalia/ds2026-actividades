interface LibroOL {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

document.getElementById("buscar")!.addEventListener("click", async () => {

  const input = document.getElementById("busqueda") as HTMLInputElement;
  const texto = input.value;

  const cont = document.getElementById("resultados") as HTMLElement;
  const error = document.getElementById("error") as HTMLElement;

  cont.innerHTML = "";
  error.textContent = "";

  // Validación
  if (!texto) {
    error.textContent = "Ingrese un texto";
    error.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${texto}`);

    if (!res.ok) {
      throw new Error("Error API");
    }

    const data = await res.json();

    const libros: LibroOL[] = data.docs;

    libros.slice(0, 10).forEach(l => {

      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${l.title}</h3>
        <p>Autor: ${l.author_name?.[0] || "Desconocido"}</p>
        <p>Año: ${l.first_publish_year || "N/A"}</p>
        <hr>
      `;

      cont.appendChild(div);
    });

  } catch {
    error.textContent = "Error al buscar";
    error.style.color = "red";
  }

});