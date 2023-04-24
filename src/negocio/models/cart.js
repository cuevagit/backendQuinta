import { CartDto } from "../dtos/cartDTO.js"
import { crearId } from "../utils/randomId.js"


class Carrito{

    #id
    #usuario
    #productos


    constructor({ _id = crearId(), usuario, productos = [] }) {
        this.#id = _id
        this.#usuario = usuario
        this.#productos = productos
    }

    
    get id() { return this.#id }

    get usuario() { return this.#usuario }

    get productos() { return this.#productos }

            

       datos() {
        return new CartDto({
            _id: this.#id,  
            usuario: this.#usuario,  
            productos: this.#productos
        })
      }

    }

  

 export default Carrito;
