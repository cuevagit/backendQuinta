import express from 'express';
const routerApiShoppingCart = express.Router();


import  {controladorPostItemProducts,
        controladorGetItems,
        controladorDeleteItems,
        controladorDeleteItemsSegunIdProducts}  from '../controllers/controllerShoppingCart.js';


routerApiShoppingCart.post('/', controladorPostItemProducts);
routerApiShoppingCart.get('/', controladorGetItems);
routerApiShoppingCart.delete('/', controladorDeleteItems);
routerApiShoppingCart.delete('/:id_prod', controladorDeleteItemsSegunIdProducts);


export default routerApiShoppingCart;
