function generarAsteriscos(n: number): string {
  let resultado = "";

  for (let i = 1; i <= n; i++) {
    resultado += "*".repeat(i) + "\n";
  }

  return resultado;
}

function generar(): void {
  const input = document.getElementById("numero") as HTMLInputElement;
  const salida = document.getElementById("resultado") as HTMLElement;

  const valor = Number(input.value);

  salida.textContent = generarAsteriscos(valor);
}