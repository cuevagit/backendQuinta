import express from 'express';
import { controladorLoginp } from '../controllers/controllerLogin.js';
import {controladorLogout} from '../controllers/controllerLogin.js';


const routerLogin = express.Router();


routerLogin.post('/api/sessions', controladorLoginp); 
routerLogin.post('/logout',  controladorLogout);



export default routerLogin;

