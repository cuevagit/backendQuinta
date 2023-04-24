import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import loggerInfo from '../../negocio/utils/pinoInfo.js';
import {userService} from '../../negocio/services/user.service.js'
import { createToken } from '../../negocio/utils/jwt.js';
import { validatePassword } from '../../negocio/utils/bcrypt.js';


 
 function controladorLogout(req, res) {
  if(req.user) { 
    req.destroy();
    res.status(200).json({"mensaje": "Usuario deslogueado"})
  } else {
    loggerWarn({"mensaje": "No hay Usuario logueado"})
    res.json({"mensaje": "No hay Usuario logueado"})
  }
}
   

async function controladorLoginp(req, res) {
  
  const usuario = await userService.buscar_usuario(req.body.email)

  let mensaje
  mensaje = ""

  if(!usuario)
    mensaje = "Usuario inexistente"
    
    if(usuario)
     if(!validatePassword(usuario, req.body.password))
      mensaje = "Password incorrecto"

  if(mensaje === "") {
      //Creo el Token y lo envio al header
      const token = createToken(usuario)
      res.header('authorization', token)
      loggerInfo({"token": token})
      res.status(200).json({mensaje: usuario.email})
  } else {
    loggerError(mensaje)
    res.status(403).json({mensaje: mensaje})
  }  

}

 
  
export {controladorLoginp, controladorLogout}
