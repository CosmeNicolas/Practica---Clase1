import { productos } from "./productos.js";

let carrito = [];

const productsContainer = document.getElementById("productsContainer");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

const productForm = document.getElementById("productForm");
const nombreInput = document.getElementById("nombreInput");
const precioInput = document.getElementById("precioInput");
const descripcionInput = document.getElementById("descripcionInput");
const imagenInput = document.getElementById("imagenInput");

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

function agregarNuevoProducto(event) {
  event.preventDefault();

  const nuevoProducto = {
    id: Date.now(),
    nombre: nombreInput.value.trim(),
    precio: Number(precioInput.value),
    descripcion: descripcionInput.value.trim(),
    imagen: imagenInput.value.trim()
  };

  productos.push(nuevoProducto);

  mostrarProductos();

  productForm.reset();
}

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

    li.querySelector(".btn-restar").addEventListener("click", () => {
      disminuirCantidad(item.id);
    });

    li.querySelector(".btn-sumar").addEventListener("click", () => {
      aumentarCantidad(item.id);
    });

    li.querySelector(".remove-btn").addEventListener("click", () => {
      eliminarProducto(item.id);
    });

    cartItems.appendChild(li);
  });

  calcularTotal();
}

function aumentarCantidad(idProducto) {
  const producto = carrito.find((item) => item.id === idProducto);

  if (producto) producto.cantidad++;

  mostrarCarrito();
}

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

function eliminarProducto(idProducto) {
  carrito = carrito.filter((item) => item.id !== idProducto);
  mostrarCarrito();
}

function calcularTotal() {
  const total = carrito.reduce((acumulador, item) => {
    return acumulador + item.precio * item.cantidad;
  }, 0);

  totalPrice.textContent = total.toLocaleString();
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  alert("Compra finalizada correctamente. Total: $" + totalPrice.textContent);
  vaciarCarrito();
}

productForm.addEventListener("submit", agregarNuevoProducto);
checkoutBtn.addEventListener("click", finalizarCompra);
clearCartBtn.addEventListener("click", vaciarCarrito);

mostrarProductos();
mostrarCarrito();