export class CartDto {
    constructor({ _id, usuario, productos = [] }) {

        if (typeof _id !== 'string') throw new Error('tipo invalido')
        if (!_id) throw new Error('parametro requerido')
        this._id = _id

        if (typeof usuario !== 'string') throw new Error('tipo invalido')
        if (!usuario) throw new Error('parametro requerido')
        this.usuario = usuario

        if (!typeof productos instanceof Array) throw new Error('tipo invalido')
        if (!productos) throw new Error('parametro requerido')
        this.productos = productos
        
    }
}