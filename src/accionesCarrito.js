
let carrito = [];

const validarProductoRepetido = (productoId) => {

    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
    }

    const productoRepetido = carrito.find(producto => producto.id === productoId);

    if (productoRepetido) {
        productoRepetido.cantidad++;
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
    } else {
        agregarAlCarrito(productoId);
    }

};

const agregarAlCarrito = (productoId) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const producto = productos.find(producto => producto.id === productoId);
    carrito.push(producto);

    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} value='${producto.id}' class='btn waves-effect waves-ligth boton-eliminar'>X</button>
                    `;
    contenedor.appendChild(div);
    actualizarTotalesCarrito(carrito);
};


// pinta el Carrito

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                        <button id=eliminar${producto.id} value='${producto.id}' class='btn waves-effect waves-ligth boton-eliminar'>X</button>
                        `;
        contenedor.appendChild(div);
    });
};

const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter(producto => producto.id != productoId);

    actualizarTotalesCarrito(carritoActualizado);
    pintarCarrito(carritoActualizado);
    Swal.fire({
        icon: "success",
        title: "Se elimino del carrito",
        showConfirmButton: false,
        timer: 800
    })
};


// funcion que vacia el array hasta que su longitud deje de ser mayor a 0 tambien actualiza los valores del carrito

let botones = document.querySelectorAll('.material-icons');
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        if (carrito.length){ 
            while (carrito.length > 0) {
                carrito.pop()
                actualizarTotalesCarrito(carrito)
            pintarCarrito(carrito)
    
            Swal.fire({
                icon: "success",
                title: "Los productos han sido eliminados con éxito!",
                showConfirmButton: false,
                timer: 1300
            })
        }
        } else if ( carrito.length === 0){
            Swal.fire({
                icon: "error",
                title: "El carrito esta vacio!",
                showConfirmButton: false,
                timer: 1300
            })
        }
    })
})
