export class CartProdsDto {
    constructor({ idProd, cant }) {

        if (typeof idProd !== 'string') throw new Error('tipo invalido')
        if (!idProd) throw new Error('parametro requerido')
        this.idProd = idProd

        if (typeof cant !== 'number') throw new Error('tipo invalido')
        if (!cant) throw new Error('parametro requerido')
        this.cant = cant
        
    }
}