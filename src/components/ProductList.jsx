import { ProductCard } from "./ProductCard.jsx";

export function ProductList({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span aria-hidden="true">⌕</span>
        <h3>No encontramos juegos</h3>
        <p>Prueba otra búsqueda o selecciona todas las plataformas.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}
