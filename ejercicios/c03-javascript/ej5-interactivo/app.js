const input = document.querySelector("#altura");
const boton = document.querySelector("#btnGenerar");
const resultado = document.querySelector("#resultado");

boton.addEventListener("click", () => {

    const valor = input.value;

    if (valor === "" || valor < 1) {
        resultado.textContent = "Por favor ingrese un número válido";
        return;
    }

    let salida = "";

    for (let i = 1; i <= valor; i++) {
        salida = salida + "*".repeat(i) + "\n";
    }

    resultado.textContent = salida;
});