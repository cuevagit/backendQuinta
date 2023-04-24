import User from '../../models/user.js'


export class user {

    #dao
    constructor(dao) {
        this.#dao = dao
    }

    
    async grabarUsuario(usuario) {
        try {
            const resul = await this.#dao.save(usuario.datos())
            return resul
        } catch(error) {
            return error
        }
    }

    async buscar_usuario(usuario) {
        try {
            const resul = await this.#dao.buscar_usuario(usuario)
            const user = new User(resul)
            return user
        } catch(error) {
            return error
        }
    }


}

