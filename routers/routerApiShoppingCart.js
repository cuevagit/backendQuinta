import express from 'express';
const routerApiShoppingCart = express.Router();


import  {controladorPostItemProducts,
        controladorGetItemsSegunId,
        controladorDeleteItemsSegunId,
        controladorDeleteItemsSegunIdProducts}  from '../controllers/controllerShoppingCart.js';


routerApiShoppingCart.post('/', controladorPostItemProducts);
routerApiShoppingCart.get('/', controladorGetItemsSegunId);
routerApiShoppingCart.delete('/', controladorDeleteItemsSegunId);
routerApiShoppingCart.delete('/:id_prod', controladorDeleteItemsSegunIdProducts);


export default routerApiShoppingCart;
