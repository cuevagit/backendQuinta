

class Contenedor{

    cliente;
    tabla;

    constructor(cliente, tabla) {
        this.cliente = cliente;
        this.tabla = tabla;
    }



//PRODUCTOS 

    async save(objeto){
 
        try {
            const data = await this.cliente(this.tabla).insert(objeto);
            return data[0]
        }
       catch(error){
            return error
        } 

      }


    async getById(id){
       
        try {

            const objetoBuscado = await this.cliente(this.tabla).select().where("_id", "=", id)
            if(objetoBuscado[0]===undefined){
                return null
            }else{
                return objetoBuscado[0];
            }
            
        }

        catch(error){
            return error
        } 

     }


     async getAll(){
    
        try {
            const contenido = await this.cliente(this.tabla).select();
    
                if(contenido) { 
                 return contenido
                } else { 
                 return null
                }
            }
    
        catch(error){
            return error
        } 
    
    }
    

    async deleteById(id){
        try {
        const objetoBuscado = await this.getById(id)

          if(objetoBuscado){ 
            await this.cliente(this.tabla).del().where("_id", "=", id)
            return objetoBuscado;
          } else {
            return 'No existe el producto con el id: ' + id
          }
        }
       catch(error){
            return error
        } 
    }


    async update(objeto){
        try {
          if(this.getById(objeto._id)){ 
            await this.cliente(this.tabla).update(objeto).where("_id", "=", objeto._id);
            return objeto;
        } else {
            return 'No existe el producto con el id: ' + objeto._id
        }
         
        }
        catch(error){
            return error
        } 
    }
    

  }



 export  default Contenedor;
