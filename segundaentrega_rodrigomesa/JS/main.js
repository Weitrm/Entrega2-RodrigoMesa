const productos = [
    {   
        id: 1,
        nombre: "Aire acondicionado",
        precio: 50000
    },
    {
         id: 2, 
         nombre: "Aislante", 
         precio: 10000 
    },
    { 
        id: 3, 
        nombre: "Calefactor", 
        precio: 20000
    },
    { 
        id: 4, 
        nombre: "Ventilador", 
        precio: 15000 
    },
    { 
        id: 5, 
        nombre: "Estufa", 
        precio: 30000 
    }
];

let cartProducts = [];
let productsContainer = document.getElementById("products-container");

function renderProductos(productsArray) {
    productsContainer.innerHTML = ''; 
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button id="${producto.id}" class="productoAgregar">Agregar al carrito</button>
            <button id="eliminar-${producto.id}" class="productoEliminar">Eliminar</button>
        `;
        productsContainer.appendChild(card);
    });
    addToCartButton();
    addDeleteButton(); 
}

// Agregar productos al carrito
function addToCartButton() {
    const addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);
            cartProducts.push(selectedProduct);
            console.log(cartProducts);

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        };
    });
}

// Eliminar productos de la tienda
function addDeleteButton() {
    const deleteButtons = document.querySelectorAll(".productoEliminar");
    deleteButtons.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id.replace('eliminar-', ''));
            const index = productos.findIndex(producto => producto.id === productId);
            if (index !== -1) {
                productos.splice(index, 1);
                console.log(`Producto con ID ${productId} eliminado`);
            }

            renderProductos(productos);
        };
    });
}

// Agregar nuevo producto a la tienda
const productForm = document.getElementById("product-form");

productForm.onsubmit = (e) => {
    e.preventDefault();
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;

    const newId = productos[productos.length - 1].id + 1;
    const newProduct = { id: newId, nombre: productName, precio: parseInt(productPrice) };
    productos.push(newProduct);
    productForm.reset();
    renderProductos(productos);
};


renderProductos(productos);
