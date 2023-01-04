import { firestoreDatabase } from '../db/firestoreClient.js';

class Container{

    coleccion;

    constructor(nombreColeccion) {
        this.coleccion = firestoreDatabase.collection(nombreColeccion)    
    }



    //PRODUCTOS y CARRITO
    async save(objeto){

        try {
            const ref = await this.coleccion.add(objeto)
            return { ...objeto, _id: ref.id }
        } 
        catch (error){
            error => { throw error}
        } 

      }


          //PRODUCTOS y CARRITO
    async nombreDocumento(id){
       
        try {

            const snapshot = await this.coleccion.where("_id", "=", id).get()

            if(!snapshot){
                return null
            }else{
                const resultado = []
                snapshot.forEach(doc => {
                    resultado.push({id: doc.id, ...doc.data() })
                })
                return resultado[0].id;
            }
            
        }

        catch(error){
            error => { throw error}
        } 

     }

    //PRODUCTOS y CARRITO
    async getById(id){
       
        try {

            const snapshot = await this.coleccion.where("_id", "=", id).get()

            if(snapshot.empty){
                return null
            }else{
                return snapshot.docs[0].data();
            }
          
        }

        catch(error){
            error => { throw error}
        } 

     }


    //PRODUCTOS y CARRITO
     async getAll(){

        try {

            const snapshot = await this.coleccion.get()

            if(!snapshot){
                return null
            }else{

                const resultado = []

                snapshot.forEach(doc => {
                    resultado.push(doc.id, { ...doc.data() })
                })

                return resultado;
            }
            
        }

        catch(error){
            error => { throw error}
        } 

    }


    //PRODUCTOS
    async deleteById(id){
        try {
            const objetoBorrado = await this.getById(id)
            const id_documento = await this.nombreDocumento(id)

         if(objetoBorrado){ 
            await this.coleccion.doc(id_documento).delete()
            return objetoBorrado
          } else {
            return null
          }
        }

        catch(error){
            error => { throw error}
        } 

    }

    
    //PRODUCTOS y CARRITO
    async update(objeto){

        try {
            const id_documento = await this.nombreDocumento(objeto._id)
            await this.coleccion.doc(id_documento).update(objeto)
            return objeto;
        }
       catch(error){
            error => { throw error}
        } 
    }

    
    //CARRITO
    async save_products(objeto){

        try {
            const id_documento = await this.nombreDocumento(objeto._id)
            await this.coleccion.doc(id_documento).update({productos: objeto.productos})
            return objeto;
        }
        catch(error){
            error => { throw error }
        } 
    }


    //CARRITO
    async deleteByIdCart(id){

        try {
            const id_documento = await this.nombreDocumento(id)
            const carritoVaciado = await this.coleccion.doc(id_documento).update({productos: []})
            return carritoVaciado
        }
        catch(error){
            error => { throw error}
        } 
    }


    //CARRITO
    async deleteByIdProd(indice_cart, indice_prod){

        try {
            this.cart = await this.getAll()
            const id_documento = await this.nombreDocumento(this.cart[indice_cart]._id)
            const eliminado = this.cart[indice_cart].productos.splice(indice_prod, 1)
            await this.coleccion.doc(id_documento).update({productos: this.cart[indice_cart].productos})
            return eliminado[0]
        }
        catch(error){
            error => { throw error}
        } 
    }


 }


 export default Container;
