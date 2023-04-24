import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import {productService} from '../../negocio/services/product.service.js'



async function controladorPostProductos(req, res) {

    const objeto = req.body;

    const producto = await productService.grabarProducto(objeto)

    if(producto.message){
        res.status(500)
        loggerError(producto.message)
    } else{
        res.status(201);
        res.json(producto)
    }
}

async function controladorGetProductos(req, res) {

     const productos = await productService.listarProducto();

    if(productos)
      if(productos.message)
      loggerError(productos.message)
      else
      res.json(productos);
    else 
      res.json({"mensaje": "No hay producrtos"})

}

async function controladorGetProductosSegunId({ params: { id } }, res) {

    const productos = await productService.listarProductoPorId(id);

        if (!productos) {
            res.status(404);
            loggerWarn(`no se encontró producto con ese id (${id})`)
            res.json({ mensaje: `no se encontró producto con ese id (${id})` });
        } else {    
            if(productos.message)
            loggerError(productos.message)
           else {
            res.json(productos);
        }
    }
}


async function controladorPutProductosSegunId({ body, params: { id } }, res) {

    const productos = await productService.listarProductoPorId(id);

    if (!productos) {
        res.status(404);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if(productos.message)
        loggerError(productos.message)
       else {
        body._id = id;
        await productService.actualizarProducto(body);     
        res.json(body);
    }
  }

}


async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    
    const productos = await productService.eliminarProducto(id);
    
    if (!productos) {
        res.status(404);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if(productos.message)
        loggerError(productos.message)
       else {
        res.json(productos);
    }
   }
}


export  {controladorGetProductos, controladorPostProductos, controladorGetProductosSegunId, controladorPutProductosSegunId,
controladorDeleteProductosSegunId};