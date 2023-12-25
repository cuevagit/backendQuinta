import express from 'express';
import  {controllerOrders}  from '../controllers/controllerOrders.js';
import  {controllerListarOrders}  from '../controllers/controllerOrders.js';
import { autenticacion } from '../../negocio/middlewares/autenticacion.js';


const routerApiOrder = express.Router();

routerApiOrder.post('/', autenticacion, controllerOrders); 
routerApiOrder.get('/', autenticacion, controllerListarOrders); 


export default routerApiOrder;

