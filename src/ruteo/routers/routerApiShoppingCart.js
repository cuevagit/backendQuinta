import express from 'express';


const routerApiShoppingCart = express.Router();


import  {controladorPostItemProducts,
        controladorGetItems,
        controladorDeleteItems,
        controladorDeleteItemsSegunIdProducts}  from '../controllers/controllerShoppingCart.js';
import { autenticacion } from '../../negocio/middlewares/autenticacion.js';


routerApiShoppingCart.post('/', autenticacion, controladorPostItemProducts);
routerApiShoppingCart.get('/', autenticacion, controladorGetItems);
routerApiShoppingCart.delete('/', autenticacion, controladorDeleteItems);
routerApiShoppingCart.delete('/:id_prod', autenticacion, controladorDeleteItemsSegunIdProducts);


export default routerApiShoppingCart;
