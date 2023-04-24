import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import {userService} from '../../negocio/services/user.service.js'
import {cartService} from '../../negocio/services/cart.service.js'
import { createToken } from '../../negocio/utils/jwt.js';


 
async function controladorRegistro(req, res) {
  const existe = await userService.buscar_usuario(req.body.email)

  if(existe != null){
    loggerWarn("El usuario ya existe")
    res.status(203).json({mensaje: "El usuario ya existe"})
    return "El usuario ya existe"
  }

  const objeto = req.body; 

  const usuario = await userService.grabarUsuario(objeto);

  //Creo el Token y lo envio al header
  const token = createToken(usuario)
  res.header('authorization', token)

  //Doy de alta un carrito para este usuario
  const productos = []

  const carrito = {
    usuario: usuario._id,
    productos: productos
  }

  await cartService.grabarCarritoUsuario(carrito);

  res.status(201).json(usuario)

 }


async function controladorInfousuario(req, res){

    const usuario = await await userService.buscar_usuario(req.user)
    if(usuario.message)
     loggerError(usuario.message)
    else
     res.json(usuario)

 }


 
  
export {controladorRegistro, controladorInfousuario}
