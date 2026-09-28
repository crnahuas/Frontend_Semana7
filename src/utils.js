const currency = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatCurrency(value) {
  return currency.format(value);
}

export function readStoredCart() {
  try {
    const storedCart = JSON.parse(localStorage.getItem("pixel-store-cart"));
    return Array.isArray(storedCart) ? storedCart : [];
  } catch {
    return [];
  }
}
