import express from 'express';


const routerApiProducts = express.Router();


import  {controladorGetProductos,
        controladorPostProductos,
        controladorPutProductosSegunId,
        controladorGetProductosSegunId,
        controladorDeleteProductosSegunId
    }  from '../controllers/controllerProducts.js';
import { autenticacion } from '../../negocio/middlewares/autenticacion.js';
import { esAdmin } from '../../negocio/middlewares/esAdmin.js';



routerApiProducts.post('/', autenticacion, esAdmin, controladorPostProductos);
routerApiProducts.get('/', autenticacion, controladorGetProductos);
routerApiProducts.get('/:id', autenticacion, controladorGetProductosSegunId);
routerApiProducts.put('/:id', autenticacion, esAdmin, controladorPutProductosSegunId);
routerApiProducts.delete('/:id', autenticacion, esAdmin, controladorDeleteProductosSegunId);



export default routerApiProducts;
