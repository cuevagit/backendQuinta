

class Contenedor{

    cliente;
    tabla;
    tabla2;
    tabla3;

    constructor(cliente, tabla, tabla2, tabla3) {
        this.cliente = cliente;
        this.tabla = tabla;
        this.tabla2 = tabla2;
        this.tabla3 = tabla3;
    }



//CARRITO 

    async save(objeto){
 
        try {
            const data = await this.cliente(this.tabla).insert(objeto);
            return data[0]
        }
       catch(error){
            return error
        } 

      }


             //CARRITO
     async save_products(objeto){
        try {
            const insertado = await this.cliente(this.tabla3).where("_id", "=", objeto._idPRod ).select()
            await this.cliente(this.tabla2).insert(objeto);
            return insertado[0];
            }
            catch(error){
              return error
            } 
        }
        

    async getById(id){
       
        try {

            const objetoBuscado = await this.cliente(this.tabla2).join(this.tabla3, this.tabla3 + '._id', "=", this.tabla2 + '._idPRod').where(this.tabla2 + '._idCart', "=", id ).select()

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
          }

        catch(error){
            return error
        } 

     }


     async getAll(){
             
        try {
            const objetoBuscado = await this.cliente(this.tabla).select()

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }     
          }

        catch(error){
            return error
        } 

    }
    


    //CARRITO
    async deleteByIdCart(id){
        try {
            const carritoVaciado = await this.cliente(this.tabla2).del().where("_idCart", "=", id)
            return carritoVaciado
        }
        catch(error){
            return error
        } 
    }


    //CARRITO
    async deleteByIdProd(indice_cart, indice_prod){
       try {
        const eliminado = await this.cliente(this.tabla3).where("_id", "=", indice_prod ).select()
        await this.cliente(this.tabla2).del().where("_idCart", "=", indice_cart).andWhere("_idPRod", "=", indice_prod )
        return eliminado[0]
        }
        catch(error){
            return error
        }
    }


        //CARRITO
        async buscarIdCart(usuario){
            try {
                const idCart = await this.cliente(this.tabla2).select().where("username", "=", usuario)
                return idCart
            }
            catch(error){
                return error
            } 
        }

  }



 export  default Contenedor;
