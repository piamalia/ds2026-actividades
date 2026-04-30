interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function cargarUsuarios(): Promise<void> {

  const loading = document.getElementById("cargando") as HTMLElement;
  const ul = document.getElementById("lista") as HTMLUListElement;
  const error = document.getElementById("error") as HTMLElement;

  try {
    loading.style.display = "block";

    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error("Error HTTP");
    }

    const usuarios: Usuario[] = await res.json();

    loading.style.display = "none";

    usuarios.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.name} - ${u.email}`;
      ul.appendChild(li);
    });

  } catch (e) {
    loading.style.display = "none";
    error.textContent = "Error al cargar usuarios";
    error.style.color = "red";
  }
}

cargarUsuarios();