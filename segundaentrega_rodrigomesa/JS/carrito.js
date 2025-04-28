let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage)

let cartContainer = document.getElementById("cart-section")

function renderCarrito(cartItems) {
    cartContainer.innerHTML = "";
    cartItems.forEach(producto => {
        const cart = document.createElement("div")
        cart.innerHTML = ` 
                            <h3>${producto.nombre}</h3>
                            <p>Precio: $${producto.precio}</p>
                            <button id="${producto.id}" class="productoEliminar">Eliminar del carrito</button>
                         `
        cartContainer.appendChild(cart)
    });

    const total = cartItems.reduce((acc, producto) => acc + producto.precio, 0);

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
    cartContainer.appendChild(totalDiv);

    document.querySelectorAll(".productoEliminar").forEach(button => {
        button.onclick = (e) => {
            const idAEliminar = e.currentTarget.id
            const idx = cartItems.findIndex(producto => producto.id == idAEliminar);
            if (idx !== -1) {
                cartItems.splice(idx, 1);
                localStorage.setItem("cartProducts", JSON.stringify(cartItems));
                renderCarrito(cartItems); 
            }
        }
    });

}

renderCarrito(cartStorage)
