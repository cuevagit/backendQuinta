export class ProductDto {
    constructor({ _id, name, description, price, image }) {

        if (typeof _id !== 'string') throw new Error('tipo invalido')
        if (!_id) throw new Error('parametro requerido')
        this._id = _id

        if (typeof name !== 'string') throw new Error('tipo invalido')
        if (!name) throw new Error('parametro requerido')
        this.name = name

        if (typeof description !== 'string') throw new Error('tipo invalido')
        if (!description) throw new Error('parametro requerido')
        this.description = description

        if (typeof price !== 'number') throw new Error('tipo invalido')
        if (!price) throw new Error('parametro requerido')
        this.price = price

        if (typeof image !== 'string') throw new Error('tipo invalido')
        if (!image) throw new Error('parametro requerido')
        this.image = image
        
    }
}