interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error("Error en la petición");
    }

    // 👇 CORRECCIÓN ACÁ
    const usuarios = await res.json() as Usuario[];

    return usuarios;

  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// 👇 USO
obtenerUsuarios().then(usuarios => {
  usuarios.forEach(u => {
    console.log(u.name, "-", u.email);
  });
});