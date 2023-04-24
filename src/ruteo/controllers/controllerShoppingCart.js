import loggerError from '../../negocio/utils/pinoError.js';
import {cartService} from '../../negocio/services/cart.service.js'



async function controladorPostItemProducts(req, res) {

  try {
    const carrito = await cartService.grabarCarrito(req.user, req.body.idProd);
    res.status(201).json(carrito)
  } catch (error) {
    loggerError(error.message)
    res.json({error: error.message})
  }

}



async function controladorGetItems(req, res) {

  try {
    const Items = await cartService.listarCarritoUsuario(req.user);
    res.status(200).json(Items.productos)
  } catch (error) {
    loggerError(error.message)
    res.json({error: error.message})
  }

} 



async function controladorDeleteItems(req, res) {

  try {
    const resul = await cartService.eliminarCarrito(req.user);
    res.status(200).json(resul)
  } catch (error) {
    loggerError(error.message)
    res.json({error: error.message})
  }

}


async function controladorDeleteItemsSegunIdProducts(req, res) {

  try {
    const borrados = await cartService.eliminarProducto(req.user, req.params.id_prod); 
    res.status(201).json(borrados)
  } catch (error) {
    loggerError(error.message)
    res.json({error: error.message})
  }

}



export  {controladorPostItemProducts, controladorGetItems,
controladorDeleteItems, controladorDeleteItemsSegunIdProducts};