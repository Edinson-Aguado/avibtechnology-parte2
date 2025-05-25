// Formatea un valor numérico en pesos argentinos
export function formatPrice(value) {
    if (isNaN(value)) return '$0';
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

// Calcula el precio con descuento en USD
export function priceWithDiscount(product) {
    const price = product?.price || 0;
    const discount = product?.discount || 0;

    if (!discount || discount <= 0) return price;

    return price * (1 - discount / 100).toFixed(2);
}

// Convierte el precio final (con o sin descuento) a pesos
export function priceFinalEnPesos(product, dolarValue) {
    if (!dolarValue || !product?.price) return 0;
    const finalPriceUSD = priceWithDiscount(product);
    return finalPriceUSD * dolarValue;
}