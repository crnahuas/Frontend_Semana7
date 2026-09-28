import { useEffect, useMemo, useState } from "react";
import { products } from "./data/products.js";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { ShoppingCart } from "./components/ShoppingCart.jsx";
import { Footer } from "./components/Footer.jsx";
import { readStoredCart } from "./utils.js";

function App() {
  const [cart, setCart] = useState(readStoredCart);
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("Todas");
  const [feedback, setFeedback] = useState("");

  // useEffect mantiene el carrito al actualizar la página.
  useEffect(() => {
    localStorage.setItem("pixel-store-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!feedback) return undefined;
    const timeoutId = window.setTimeout(() => setFeedback(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  // Filtra por texto y por cualquiera de las plataformas disponibles del producto.
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesPlatform = platform === "Todas" || product.platforms.includes(platform);
      const searchableText = `${product.name} ${product.description} ${product.platforms}`.toLocaleLowerCase("es");
      return matchesPlatform && searchableText.includes(normalizedQuery);
    });
  }, [query, platform]);

  // El contador considera todas las unidades y el total utiliza el precio de oferta.
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);

  // Agrega un producto nuevo o incrementa su cantidad si ya está en el carrito.
  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      return existing
        ? currentCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...currentCart, { ...product, quantity: 1 }];
    });
    setFeedback(`${product.name} se agregó al carrito.`);
  }

  // Actualiza cantidades sin modificar directamente el arreglo almacenado en el estado.
  function incrementQuantity(productId) {
    setCart((currentCart) => currentCart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }

  function decrementQuantity(productId) {
    setCart((currentCart) => currentCart
      .map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0));
  }

  // Permite eliminar un producto específico o restablecer completamente el carrito.
  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
    setFeedback("Producto eliminado del carrito.");
  }

  function clearCart() {
    setCart([]);
    setFeedback("Carrito vaciado.");
  }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido principal</a>
      <Header cartCount={cartCount} />
      <main id="contenido">
        <Hero />
        <section id="productos" className="catalog" aria-labelledby="catalog-title">
          <div className="section-heading catalog-heading">
            <div>
              <h2 id="catalog-title">Encuentra tu próximo juego</h2>
              <p className="section-intro">{filteredProducts.length} de {products.length} juegos disponibles.</p>
            </div>
            <div className="filters" aria-label="Filtros del catálogo">
              <label>
                <span>Buscar</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Nombre o plataforma"
                />
              </label>
              <label>
                <span>Plataforma</span>
                <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
                  <option>Todas</option>
                  <option>PC</option>
                  <option>PlayStation</option>
                  <option>Xbox</option>
                  <option>Nintendo</option>
                </select>
              </label>
            </div>
          </div>
          <ProductList products={filteredProducts} onAdd={addToCart} />
        </section>

        <p className="feedback" role="status" aria-live="polite">{feedback}</p>
        <ShoppingCart
          cart={cart}
          count={cartCount}
          total={cartTotal}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
