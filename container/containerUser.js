import { mongoDatabase } from '../db/mongoClient.js';
import { USUARIOADMIN } from '../config.js'

class ContainerUser{

    coleccion;

    constructor(nombreColeccion) {
        this.coleccion = mongoDatabase.collection(nombreColeccion);
    }


    async esAdmin(usuario){   
        try {
            const user =  await this.coleccion.findOne({username: usuario})
            if(user.tipo_usuario == USUARIOADMIN){ 
              return true
             }
            else{
              return false
         } 
        } catch (error) {
            return error
        }
    }

    async buscar_usuario(usuario){
        try {
            const user = await this.coleccion.findOne({username: usuario})
            return user
        } catch (error) {
            return error
        }
   }

}

export default ContainerUser;
