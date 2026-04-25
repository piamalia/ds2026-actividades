"use strict";
function generarAsteriscos(n) {
    let resultado = "";
    for (let i = 1; i <= n; i++) {
        resultado += "*".repeat(i) + "\n";
    }
    return resultado;
}
function generar() {
    const input = document.getElementById("numero");
    const salida = document.getElementById("resultado");
    const valor = Number(input.value);
    salida.textContent = generarAsteriscos(valor);
}
