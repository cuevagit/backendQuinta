import express from 'express';
import { controladorLoginp } from '../controllers/controllerLogin.js';


const routerLogin = express.Router();


routerLogin.post('/api/sessions', controladorLoginp); 


export default routerLogin;

