# 👜 Cueros Co. — Documentación Técnica del Proyecto

**Repositorio:** [github.com/marisolm/proyectoFinal-Marecos](https://github.com/marisolm/proyectoFinal-Marecos)
**Demo:** [cursoreact-m0lgep2uy-marisolms-projects.vercel.app](https://cursoreact-m0lgep2uy-marisolms-projects.vercel.app)

---

## 1. Descripción general

Cueros Co. es una **Single Page Application (SPA)** de e-commerce desarrollada como proyecto final de un curso de React. Simula una tienda online de productos de cuero premium (carteras, bolsos, billeteras), con catálogo por categorías, ficha de producto, carrito de compras y checkout con persistencia real en base de datos.

No es una tienda funcional en producción (no hay pasarela de pago ni backend de autenticación), sino una demostración completa del ciclo de un e-commerce: **listado → detalle → carrito → orden de compra**, con estado global y persistencia en Firebase Firestore.

---

## 2. Stack tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| Librería UI | React | 19.2 |
| Build tool / dev server | Vite | 7.2 |
| Ruteo SPA | React Router | 7.13 |
| Base de datos | Firebase (Firestore) | 12.9 |
| Iconografía | React Icons | 5.5 |
| Linting | ESLint | 9.39 |

**Scripts disponibles** (`package.json`):

```bash
npm run dev       # levanta el servidor de desarrollo (Vite)
npm run build     # genera el build de producción
npm run preview   # sirve el build de producción localmente
npm run lint      # corre ESLint sobre el proyecto
```

---

## 3. Estructura de carpetas

```
proyectoFinal-Marecos/
├── public/
│   └── image/                  # Imágenes de producto servidas estáticamente
├── src/
│   ├── components/
│   │   ├── NavBar/             # Barra de navegación + logo + links de categoría
│   │   ├── CartWidget/         # Ícono de carrito con contador de unidades
│   │   ├── ItemListContainer/  # Contenedor: trae productos (todos o por categoría) desde Firestore
│   │   ├── ItemList/           # Grilla de productos
│   │   ├── Item/               # Card de producto individual
│   │   ├── ItemDetailContainer/ # Contenedor: trae UN producto por ID desde Firestore
│   │   ├── ItemDetail/         # Ficha de producto (imagen, descripción, precio, stock)
│   │   ├── ItemCount/          # Selector de cantidad (+/-) antes de agregar al carrito
│   │   ├── Cart/               # Vista del carrito de compras
│   │   ├── CartItem/           # Línea de producto dentro del carrito
│   │   ├── Checkout/           # Formulario de datos del comprador + generación de orden
│   │   └── NotFound/           # Página 404
│   ├── context/
│   │   └── CartContext.jsx     # Estado global del carrito (Context API)
│   ├── data/
│   │   ├── data.js             # Mock de productos (no usado por los containers actuales)
│   │   └── api.js              # Cliente para una API REST alternativa (no usado por los containers actuales)
│   ├── db/
│   │   ├── db.js               # Inicialización de Firebase / Firestore
│   │   └── seed.js             # Script para cargar productos iniciales en Firestore
│   ├── img/                     # Assets propios de la UI (ej. logo)
│   ├── App.jsx                  # Definición de rutas
│   └── main.jsx                 # Punto de entrada de React
├── index.html
├── vite.config.js
└── package.json
```

> **Nota:** el proyecto conserva dos fuentes de datos alternativas sin usar (`src/data/data.js` con productos mockeados y `src/data/api.js` apuntando a una API REST en Render). La versión actual de los containers (`ItemListContainer`, `ItemDetailContainer`) consulta directamente **Firestore**, por lo que esos dos archivos son remanentes de etapas previas del curso y podrían eliminarse o documentarse como "alternativas históricas".

---

## 4. Arquitectura y flujo de datos

```
Firestore ("products", "orders")
        │
        ▼
ItemListContainer / ItemDetailContainer   ← leen datos con Firebase SDK (getDocs / getDoc)
        │
        ▼
ItemList → Item          ItemDetail → ItemCount
        │                        │
        └──────────► CartContext (Context API) ◄──────────┘
                          │
                          ▼
                 CartWidget · Cart · CartItem · Checkout
                          │
                          ▼
                 Checkout escribe la orden en Firestore ("orders")
                 y descuenta stock en "products" (increment)
```

- **Estado global:** `CartContext` (`src/context/CartContext.jsx`) expone `cart`, `addProduct`, `deleteProduct`, `deleteCart`, `totalQuantity` y `totalPrice` mediante `useContext`. Es el único estado compartido entre pantallas; no se usa Redux ni otra librería de estado.
- **Persistencia:** Firebase Firestore, con dos colecciones: `products` y `orders`.
- **Ruteo:** manejado con `react-router` (`BrowserRouter`, `Routes`, `Route`) en `App.jsx`.

---

## 5. Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `ItemListContainer` | Catálogo completo de productos |
| `/category/:category` | `ItemListContainer` | Catálogo filtrado por categoría (`carteras`, `bolsos`, `billeteras`) |
| `/detail/:productId` | `ItemDetailContainer` | Ficha de un producto puntual |
| `/cart` | `Cart` | Carrito de compras |
| `/checkout` | `Checkout` | Formulario de datos y confirmación de compra |
| `*` | `NotFound` | Página 404 para rutas inexistentes |

---

## 6. Detalle de componentes

### NavBar
Header fijo con logo (link a home), links de categoría (`NavLink`, resaltan la ruta activa) y el `CartWidget`.

### CartWidget
Ícono de carrito (`react-icons`) enlazado a `/cart`. Muestra un badge con la cantidad total de unidades (`totalQuantity()` del contexto), solo si es mayor a 0.

### ItemListContainer
Trae productos de Firestore. Si la ruta trae `:category` (via `useParams`), filtra con `query(...where("category", "==", category))`; si no, trae todos los documentos de `products`. Maneja estado de `loading`.

### ItemList / Item
`ItemList` recibe el array de productos y renderiza una grilla de `Item`. Cada `Item` muestra imagen, nombre, precio y un link a `/detail/:id`.

### ItemDetailContainer / ItemDetail
`ItemDetailContainer` trae un único documento de Firestore por `productId` (`useParams`). `ItemDetail` muestra imagen, descripción y precio; si `stock <= 0` muestra "Producto agotado"; si hay stock, muestra `ItemCount` para elegir cantidad y agregar al carrito. Una vez agregado, reemplaza el selector por un mensaje de confirmación y un link directo a `/cart`.

### ItemCount
Selector +/- con límites: no baja de 1 ni supera el `stock` disponible. Al confirmar, dispara `addToCart(count)`.

### Cart / CartItem
`Cart` muestra el estado vacío ("El carrito está vacío") o la lista de `CartItem` (imagen, cantidad, precio unitario, subtotal, botón eliminar), el total (`totalPrice()`), un botón para vaciar el carrito y un link a `/checkout`.

### Checkout
Formulario controlado (`fullname`, `phone`, `email`). Al enviar:
1. Arma un objeto `order` con datos del comprador, copia del carrito, total y fecha.
2. Lo guarda en la colección `orders` de Firestore (`addDoc`).
3. Descuenta el stock comprado de cada producto en `products` usando `increment(-cantidad)`.
4. Vacía el carrito (`deleteCart`) y muestra el número de orden generado (`orderId`).

### NotFound
Página simple de error 404 con link de retorno al home.

---

## 7. Modelo de datos (Firestore)

**Colección `products`**
```json
{
  "name": "Tote Bag Aurora",
  "description": "Cartera amplia de cuero vacuno graneado...",
  "stock": 15,
  "image": "/image/tote-aurora.jpg",
  "price": 145,
  "category": "carteras"
}
```

**Colección `orders`** (generada por `Checkout`)
```json
{
  "buyer": { "fullname": "...", "phone": "...", "email": "..." },
  "products": [ /* copia de los items del carrito, con quantity */ ],
  "total": 000,
  "date": "Timestamp"
}
```

El archivo `src/db/seed.js` permite poblar la colección `products` desde una lista hardcodeada de 12 productos (carteras, bolsos y billeteras) — está pensado para ejecutarse una única vez para inicializar la base.

---

## 8. Configuración de Firebase

La configuración vive en `src/db/db.js`, con las credenciales del proyecto Firebase (`apiKey`, `authDomain`, `projectId`, etc.) escritas directamente en el código fuente.

> **Observación de buenas prácticas:** al ser un repositorio público, esta configuración queda expuesta. Para un proyecto de curso el riesgo es bajo (la `apiKey` de Firebase no es secreta en sí misma — la seguridad real depende de las **reglas de Firestore**), pero si en algún momento este código se reutiliza en un contexto productivo, conviene:
> - Mover la config a variables de entorno (`import.meta.env.VITE_FIREBASE_*` con Vite).
> - Revisar que las reglas de seguridad de Firestore no dejen lectura/escritura abierta a cualquiera.

---

## 9. Instalación y ejecución local

```bash
git clone https://github.com/marisolm/proyectoFinal-Marecos.git
cd proyectoFinal-Marecos
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173` (puerto por defecto de Vite).

Para poblar la base de datos con productos de ejemplo (una sola vez):
```bash
node src/db/seed.js
```

---

## 10. Posibles mejoras futuras

- Unificar la fuente de datos: eliminar o documentar explícitamente `src/data/data.js` y `src/data/api.js` si ya no se usan.
- Mover credenciales de Firebase a variables de entorno.
- Agregar validaciones de formulario en `Checkout` (formato de email/teléfono).
- Persistir el carrito en `localStorage` o Firestore para que sobreviva a un refresh de página (hoy vive solo en memoria vía Context).
- Agregar manejo de errores visibles al usuario (hoy los `catch` solo hacen `console.error`).
- Tests unitarios (no hay carpeta de tests en el repo actual).

---

*Documentación generada a partir del análisis del código fuente del repositorio, con fecha 24 de julio de 2026.*
