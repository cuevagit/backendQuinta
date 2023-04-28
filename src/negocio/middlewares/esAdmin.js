import { EMAILADMIN } from '../../config/config.js'
import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';

export async function esAdmin(req, res, next){

    if(req.user){
      const usuario = req.user

      if(usuario.message)
       loggerError(usuario.message)
      else
        if(usuario.email === EMAILADMIN)         
          next()
        else
          res.status(401).json({"mensaje": "El usuario no es Admin"})
     } else {
        loggerWarn("No hay usuario logueado")
        res.status(401).json({"mensaje": "No hay usuario logueado"})
    }
  
}
  