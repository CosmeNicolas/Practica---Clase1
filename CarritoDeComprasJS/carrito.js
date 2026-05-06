// Importamos el array de productos desde productos.js
import { productos } from "./productos.js";

// Array donde se guardan los productos agregados al carrito
let carrito = [];

// Capturamos elementos del HTML
const productsContainer = document.getElementById("productsContainer");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

// Renderiza los productos en pantalla
function mostrarProductos() {
  productsContainer.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <span class="price">$${producto.precio.toLocaleString()}</span>
      <button class="add-to-cart">Agregar al Carrito</button>
    `;

    const botonAgregar = card.querySelector(".add-to-cart");

    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });

    productsContainer.appendChild(card);
  });
}

// Agrega un producto al carrito
function agregarAlCarrito(idProducto) {
  const productoEncontrado = productos.find((producto) => producto.id === idProducto);

  if (!productoEncontrado) return;

  const productoEnCarrito = carrito.find((item) => item.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({
      ...productoEncontrado,
      cantidad: 1
    });
  }

  mostrarCarrito();
}

// Renderiza el carrito actualizado
function mostrarCarrito() {
  cartItems.innerHTML = "";

  if (carrito.length === 0) {
    cartItems.innerHTML = "<p>El carrito está vacío.</p>";
    calcularTotal();
    return;
  }

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <h4>${item.nombre}</h4>
      <p>Precio unitario: $${item.precio.toLocaleString()}</p>

      <div class="cart-controls">
        <button class="btn-restar">-</button>
        <span>${item.cantidad}</span>
        <button class="btn-sumar">+</button>
        <button class="remove-btn">Eliminar</button>
      </div>
    `;

    const btnRestar = li.querySelector(".btn-restar");
    const btnSumar = li.querySelector(".btn-sumar");
    const btnEliminar = li.querySelector(".remove-btn");

    btnRestar.addEventListener("click", () => {
      disminuirCantidad(item.id);
    });

    btnSumar.addEventListener("click", () => {
      aumentarCantidad(item.id);
    });

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(item.id);
    });

    cartItems.appendChild(li);
  });

  calcularTotal();
}

// Aumenta la cantidad de un producto dentro del carrito
function aumentarCantidad(idProducto) {
  const producto = carrito.find((item) => item.id === idProducto);

  if (producto) {
    producto.cantidad++;
  }

  mostrarCarrito();
}

// Disminuye la cantidad de un producto
function disminuirCantidad(idProducto) {
  const producto = carrito.find((item) => item.id === idProducto);

  if (!producto) return;

  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    eliminarProducto(idProducto);
    return;
  }

  mostrarCarrito();
}

// Elimina completamente un producto del carrito
function eliminarProducto(idProducto) {
  carrito = carrito.filter((item) => item.id !== idProducto);
  mostrarCarrito();
}

// Calcula el total final del carrito
function calcularTotal() {
  const total = carrito.reduce((acumulador, item) => {
    return acumulador + item.precio * item.cantidad;
  }, 0);

  totalPrice.textContent = total.toLocaleString();
}

// Vacía todo el carrito
function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

// Finaliza la compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  alert("Compra finalizada correctamente. Total: $" + totalPrice.textContent);
  vaciarCarrito();
}

// Eventos de botones principales
checkoutBtn.addEventListener("click", finalizarCompra);
clearCartBtn.addEventListener("click", vaciarCarrito);

// Inicializamos la app
mostrarProductos();
mostrarCarrito();