/*
- Crear las funciones de la aplicación web
- interactuar con el DOM HTML
- generar eventos JS
- localStorage + JSON
*/

const tbody = document.querySelector("tbody")

const carrito = []

const prendas =[{ codigo: 1, tipo: 'Remera rosa', precio: 2500},
                { codigo: 2, tipo: 'Campera y Pantalon de Cuero', precio: 7399},
                { codigo: 3, tipo: 'Buzo y Babucha Blanco', precio: 6690},
                { codigo: 4, tipo: 'Buzo Gris y Pantalón de jean', precio: 8900},
                { codigo: 5, tipo: 'Tacos Azul Oscuro', precio: 4500},
                { codigo: 6, tipo: 'Abrigo Gadget color negro', precio: 5699},
                { codigo: 7, tipo: 'Campera y Pantalon Tela Teddy', precio: 6999},
                { codigo: 8, tipo: 'Top Runner', precio: 2939},
                { codigo: 9, tipo: 'Blazer y Pollera a Cuadros Azul', precio: 5899},
                { codigo: 10, tipo: 'Tacos Zara color negro', precio: 8745}
]

function buscarPrenda(codigo) {
    let resultado = prendas.find(prenda => prenda.codigo === parseInt(codigo))
        return resultado 
}

function retornoFilaHTML(prenda) {
    return `<t 
                <td>${prenda.tipo}</td>
                <td>$ ${prenda.precio}</td>
                <td><button id="${prenda.codigo}">ADD</button></td>
            </tr>`
}

function eliminarDelCarrito(id) {
    let indice = carrito.findIndex((prenda)=> prenda.codigo === id)
        indice > -1 && carrito.splice(indice, 1)
    // if (indice > -1) {
    //     carrito.splice(indice, 1)
    // }
}

function cargarPrendas(array) {
    tbody.innerHTML = ""
    array.forEach(element => {
        tbody.innerHTML += retornoFilaHTML(element)
    })
    activarClickEnBotones()
}
cargarPrendas(prendas)

function activarClickEnBotones() {
    const buttons = document.querySelectorAll("button")
        for (boton of buttons) {
            boton.addEventListener("click", (e)=> {
                agregarAlCarrito(e.target.id)
                //console.log(e.target.id)
                //console.log("Hiciste clic en un botón")
            })
        }
}

function agregarAlCarrito(id) {
    let resultado = prendas.find(prenda => prenda.codigo === parseInt(id))
        if (resultado !== undefined) {
            carrito.push(resultado)
            console.log("Se agregó el producto", resultado.tipo, "al carrito.")
            guardarElCarrito(carrito)
        }
}

function guardarElCarrito(carrito) {
    if (carrito.length > 0) {
        localStorage.setItem("carritoPrendas", JSON.stringify(carrito))
    }
}

function recuperarCarrito() {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carritoPrendas"))
    if (carritoRecuperado.length > 0) {
        carrito.push(...carritoRecuperado) //spread OPERATOR
    }
}
recuperarCarrito()

function finalizarCompra() {
    let totalCarrito = carrito.reduce((acc, prenda)=> acc + prenda.precio, 0)
    alert("El importe del carrito es de: $ " + totalCarrito)
}

/* function finalizarCompra() {
    if (carrito.length === 0) {
        console.warn("El carrito está vacío!")
        return 
    }
    const shopping = new Compra(carrito)
    alert(`El costo total es de $ ${shopping.obtenerSubtotal()}`)
    let respuesta = confirm("¿Deseas confirmar tu pago?")
        if (respuesta) {
            alert(shopping.confirmarCompra())
            carrito.length = 0
        }
} */