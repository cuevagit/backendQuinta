export class OrderDto {

    constructor({ _id, fecha, idCliente, prods = []}) {

        if (typeof _id !== 'string') throw new Error('tipo invalido')
        if (!_id) throw new Error('parametro requerido')
        this._id = _id

        if (!fecha instanceof Date) throw new Error('tipo invalido')
        if (!fecha) throw new Error('parametro requerido')
        this.fecha = fecha

        if (typeof idCliente !== 'string') throw new Error('tipo invalido')
        if (!idCliente) throw new Error('parametro requerido')
        this.idCliente = idCliente

        this.prods = prods
        
    }
}



