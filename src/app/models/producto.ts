export class Producto {
    id: number;
    nombre: string;
    categoria: string;
    estado: string;


    constructor(
        id: number = 0,
        nombre: string = '',
        categoria: string = '',
        estado: string = 'pendiente',

    ) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.estado = estado;
    }
}
