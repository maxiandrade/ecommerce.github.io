
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();

    let botones = document.querySelectorAll('.material-icons');

    botones.forEach(boton =>{
        boton.addEventListener("click", () => {
            Swal.fire({
                icon: "success",
                title: "Se agrego al carrito",
                text: "esperamos tu compra",
                showConfirmButton: false,
                timer: 1300
            })
        })
    })

    if (localStorage.getItem('carrito')) {
        const carrito = obtenerCarritoStorage();
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    };
});
