"use strict";
async function obtenerUsuarios() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
            throw new Error("Error en la petición");
        }
        const usuarios = await res.json();
        return usuarios;
    }
    catch (error) {
        console.error("Error:", error);
        return [];
    }
}
obtenerUsuarios().then(usuarios => {
    usuarios.forEach(u => {
        console.log(u.name, "-", u.email);
    });
});
