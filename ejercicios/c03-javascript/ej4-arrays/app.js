const numeros = [5, 8, 2, 10, 3, 7, 1, 6];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (let i = 0; i < numeros.length; i++) {

    suma = suma + numeros[i];

    if (numeros[i] > mayor) {
        mayor = numeros[i];
    }

    if (numeros[i] < menor) {
        menor = numeros[i];
    }
}

let promedio = suma / numeros.length;

function generarAsteriscos(n) {

    let resultado = "";

    for (let i = 0; i < n; i++) {
        resultado = resultado + "*";
    }

    return resultado;
}