# Pixel Store — Semana 7

Cristian Nahuas · Desarrollo Frontend I · PFY2201

Aplicación eCommerce académica desarrollada con React y Vite. La actividad transforma el proyecto de semanas anteriores en componentes funcionales reutilizables, administra el carrito con hooks y usa renderizado condicional para adaptar la interfaz al estado de la aplicación.

## Ejecución local

Requiere Node.js 20 o superior.

```sh
npm install
npm run dev
```

Abrir la dirección indicada por Vite, normalmente `http://localhost:5173`.

Para verificar la versión de producción:

```sh
npm run build
npm run preview
```

## Funcionalidades

- Catálogo de nueve videojuegos con nombre, descripción, imagen, plataforma, precio normal y precio de oferta.
- Búsqueda en tiempo real y filtro por plataforma mediante el evento `onChange`.
- Carrito con botones para agregar, aumentar, disminuir, eliminar y vaciar productos mediante `onClick`.
- Contador de unidades y total dinámico calculado a partir del precio de oferta.
- Persistencia local del carrito con `useEffect` y `localStorage`.
- Renderizado condicional para carrito vacío, catálogo sin resultados y controles del carrito.
- Diseño responsivo, navegación por teclado, etiquetas accesibles y mensajes con `aria-live`.

## Componentes

```text
src/
├── components/
│   ├── CartItem.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   └── ShoppingCart.jsx
├── data/products.js
├── App.jsx
├── main.jsx
├── styles.css
└── utils.js
```

`App.jsx` conserva el estado compartido y entrega datos y funciones a los componentes mediante props. `ProductCard` y `CartItem` representan registros individuales y se reutilizan con `map`. `ShoppingCart` presenta distintos elementos según exista o no contenido en el carrito.

## Evidencias

La carpeta `capturas/` contiene las pruebas principales solicitadas por la pauta:

- `01-catalogo-react.jpg`: catálogo con precios normal y oferta.
- `02-carrito-react.jpg`: productos agregados, cantidades, contador y total.
- `03-filtro-react.jpg`: evento `onChange` y renderizado de resultados filtrados.
- `04-movil-react.jpg`: adaptación del catálogo a una pantalla móvil.

## Publicación en GitHub Pages

El archivo `.github/workflows/deploy.yml` compila y publica automáticamente la aplicación al enviar cambios a la rama `main`.

1. Crear un repositorio público y subir el contenido de esta carpeta.
2. En GitHub, abrir **Settings → Pages**.
3. Seleccionar **GitHub Actions** como fuente de publicación.
4. Enviar un cambio a `main` o ejecutar manualmente el workflow **Publicar en GitHub Pages**.

Como alternativa, el comando `npm run deploy` crea o actualiza la rama `gh-pages` usando el paquete `gh-pages`.

## Entrega

- Repositorio público: completar después de crear el repositorio.
- Aplicación publicada: completar después del primer despliegue.
- Archivo comprimido: `Cristian_Nahuas_Componentes_React_PFY2201.zip`.

Los precios son ficticios y están expresados en pesos chilenos. La aplicación no realiza compras ni cobros.
