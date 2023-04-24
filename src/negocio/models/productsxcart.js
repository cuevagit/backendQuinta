import { CartProdsDto } from "../dtos/prodxcartDTO.js"


class Carrito_prods{

    #idProd
    #cant


    constructor({ idProd, cant }) {
        this.#idProd = idProd
        this.#cant = cant     
    }

    
    get idProd() { return this.#idProd }

    get cant() { return this.#cant }

           

       datos() {
        return new CartProdsDto({
            idProd: this.#idProd,  
            cant: this.#cant,  
        })
      }

    }

  

 export default Carrito_prods;
