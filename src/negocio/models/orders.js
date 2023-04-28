import { OrderDto } from "../dtos/orderDTO.js"
import { crearId } from "../utils/randomId.js"


class Ordenes{

    #id
    #fecha
    #idCliente
    #prods


    constructor({ _id = crearId(), fecha, idCliente, prods = [] }) {
        this.#id = _id
        this.#fecha = fecha
        this.#idCliente = idCliente
        this.#prods = prods
    }

    
    get id() { return this.#id }

    get fecha() { return this.#fecha }

    get idCliente() { return this.#idCliente }

    get prods() { return this.#prods }


    datos() {
        return new OrderDto({
            _id: this.#id,  
            fecha: this.#fecha,  
            idCliente: this.#idCliente,  
            prods: this.#prods
        })
    }

}

  

 export default Ordenes;
