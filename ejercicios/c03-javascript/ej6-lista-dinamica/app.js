const input = document.querySelector("#producto");
const boton = document.querySelector("#btnAgregar");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");

function actualizarContador() {
    const cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
}

boton.addEventListener("click", () => {

    const texto = input.value;

    if (texto === "") {
        alert("Ingresá un producto");
        return;
    }

    const li = document.createElement("li");
    li.textContent = texto + " ";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        li.remove();
        actualizarContador();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    input.value = "";

    actualizarContador();
});