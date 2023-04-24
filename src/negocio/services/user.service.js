import Usuario from '../models/user.js'
import { User } from '../repository/user/index.js';
import { createHash } from '../utils/bcrypt.js';
import nodemailer from '../../negocio/utils/nodemailer.js'
import {EMAILADMIN} from '../../config/config.js'


class UserService {

    async grabarUsuario(objeto) {
        try {
            objeto.password = createHash(objeto.password)
            const user = new Usuario(objeto);
            const registroUser = await User.grabarUsuario(user)

            ////////////
            //Envio correo al administrador con los datos del usuario dado de alta
            const html = `<h1 style="color: blue;">Datos del Usuario creado: </h1> <strong>Usuario: </strong> ${user.email} <br> <strong>Contraseña: </strong> ${user.password} <br> <strong>Nombre: </strong> ${user.name} <br> <strong>Apellido: </strong> ${user.lastname} <br> <strong>Tipo de Usuario: </strong> "Usuario" <br> <img width="70px" src=${user.image} alt="Foto"<br>`
            await nodemailer("Mailer", EMAILADMIN, "nuevo registro", html, null)

            return registroUser  
        } catch (error) {
            return error
        }
    }

    async buscar_usuario(user) {
        try {
            const usuarioBuscado = await User.buscar_usuario(user)
            return usuarioBuscado.datos()  
        } catch (error) {
            return error
        }
    }
    
}

export const userService = new UserService()