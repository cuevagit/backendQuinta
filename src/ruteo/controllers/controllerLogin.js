import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import loggerInfo from '../../negocio/utils/pinoInfo.js';
import {userService} from '../../negocio/services/user.service.js'
import { createToken } from '../../negocio/utils/jwt.js';
import { validatePassword } from '../../negocio/utils/bcrypt.js';

   

async function controladorLoginp(req, res) {
  
  const usuario = await userService.buscar_usuario(req.body.email)

  let mensaje
  mensaje = ""

  if(!usuario)
    mensaje = "Usuario inexistente"
    
    if(usuario)
     if(!validatePassword(usuario.password, req.body.password))
      mensaje = "Password incorrecto"

  if(mensaje === "") {
      //Creo el Token y lo envio al header
      const token = createToken(usuario)
      res.header('authorization', token)
      //loggerInfo({"token": token})
      res.status(200).json({mensaje: usuario.email})
  } else {
    loggerError(mensaje)
    res.status(403).json({mensaje: mensaje})
  }  

}

 
  
export {controladorLoginp}
