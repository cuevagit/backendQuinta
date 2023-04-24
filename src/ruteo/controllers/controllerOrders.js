import loggerError from '../../negocio/utils/pinoError.js';
import { orderService } from '../../negocio/services/order.service.js';
import { userService } from '../../negocio/services/user.service.js';



 async function controllerOrders(req, res) {

  try {
    const resul = await orderService.grabarOrden(req.user)
    res.status(201).json(resul)
  } catch (error) {
    loggerError(error.message)
    res.json({error: error.message})
  }

}


async function controllerListarOrders(req, res) {

  try {
    const {_id} = await userService.buscar_usuario(req.user)
    const prods = await orderService.listarOrder(_id)
    res.status(200).json(prods)
  } catch (error) {
    loggerError(error.message)
    res.json({error: error.message})
  }

}

   
  
export {controllerOrders, controllerListarOrders}


