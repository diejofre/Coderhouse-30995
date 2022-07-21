// Definiciones de clases

class Contenedor { // Clase padre, no deberia ser instanciada directamente. En otros lenguajes se le conoce como clase abstracta.
    constructor(elemento) {
        this.elemento = elemento;
    }

    // Esta clase tiene 3 metodos propios, los cuales pueden ser usados por sus hijos.

    agregar(elemento) {
        // agregarDeUnaForma(elemento);
    }

    eliminar(elemento) {
        // eliminar(elemento);
    }

    obtener(elemento) {
        // obtener(elemento);
    }
}

// Clases hijas:

class Producto extends Contenedor { // Clase hija, deberia ser instanciada para poder usar los metodos propios de la clase padre.
    constructor(elemento) {
        super(elemento); // llamamos al constructor de la clase padre.
    }

    // Esta clase puede usar los metodos propios de la clase padre, sin tener que escribir el metodo agregar, eliminar o obtener nuevamente.

    // tambien podemos agregar metodos propios de la clase hija.
    editar(elemento) {
        // editar(elemento);
    }
}

class Carrito extends Contenedor {
    constructor(elemento) {
        super(elemento);
    }

    // Al igual que Producto, no se deben escribir los metodos agregar, eliminar o obtener.

    // Pero no podemos hacer uso de los metodos de Producto.

    // En caso de que una clase hija necesita cambiar el comportamiento de un metodo de la clase padre, se puede sobreescribir el metodo.
    agregar(elemento) {
        // agregarDeOtraForma(elemento);
    }

}

// Uso de las clases

const contenedor = new Contenedor(elemento); // si bien esto es aceptado por javascript, no sera necesario instanciar Contenedor directamente. 

const producto = new Producto(elemento);
producto.agregar(elemento); // nunca escribimos agregar(elemento) en Producto, pero como extiende de Contenedor, podemos usar su metodo agregar.

producto.editar(elemento); // podemos usar el metodo editar de Producto.

contenedor.editar(elemento); // el metodo editar fue creado en Producto, por lo que no podemos usarlo en Contenedor.

const carrito = new Carrito(elemento);
carrito.agregar(elemento); // que se va a ejecutar en este caso?