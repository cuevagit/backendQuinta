import Ordenes from '../../models/orders.js'


export class order {

    #dao
    constructor(dao) {
        this.#dao = dao
    }

    
    async grabarOrden(order) {
        try {
            const resul = await this.#dao.save(order.datos())
            return resul
        } catch(error) {
            return error
        }
    }

    async listarOrder(usuario) {
        try {
            const dtos = await this.#dao.getByIdUserOrders(usuario._id)
          if(dtos !== []){
            const datos = dtos.map(dto => new Ordenes(dto))
            return datos
          } else 
            return null

        } catch (error) {
            return error
        }
    }

}

