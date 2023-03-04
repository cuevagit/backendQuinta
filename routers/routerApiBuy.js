import express from 'express';
import  {controladorBuy}  from '../controllers/controllerrBuy.js';

const routerApiBuy = express.Router();

routerApiBuy.post('/',  controladorBuy); 


export default routerApiBuy;

