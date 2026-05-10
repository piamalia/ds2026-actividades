async function buscar() {
  const texto = document.getElementById("buscador").value;

  const res = await fetch(`https://openlibrary.org/search.json?q=${texto}`);
  const data = await res.json();

  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  data.docs.slice(0, 10).forEach(libro => {
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5>${libro.title}</h5>
            <p>${libro.author_name?.[0] || "Autor desconocido"}</p>
          </div>
        </div>
      </div>
    `;
  });
}