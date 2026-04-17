function calcularPrecioFinal(monto, medioPago) {

    let descuento = 0;

    if (monto < 200) {
        descuento = 0;

    } else if (monto >= 200 && monto <= 400) {

        if (medioPago === "E") {
            descuento = 0.30;
        } else if (medioPago === "D") {
            descuento = 0.20;
        } else if (medioPago === "C") {
            descuento = 0.10;
        }

    } else {
        descuento = 0.40;
    }

    let precioFinal = monto - (monto * descuento);

    return precioFinal;
}