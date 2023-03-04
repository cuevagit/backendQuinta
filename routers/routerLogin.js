import express from 'express';
import { controladorLoginp } from '../controllers/controllerLogin.js';
import passport from "passport";
import {controladorRegistro} from '../controllers/controllerLogin.js';
import {controladorLogout} from '../controllers/controllerLogin.js';
import {controladorInfousuario} from '../controllers/controllerLogin.js';


const routerLogin = express.Router();

routerLogin.post('/login', passport.authenticate("login"),  controladorLoginp); 
routerLogin.post('/api/users', passport.authenticate("register"), controladorRegistro);
routerLogin.get('/api/userinfo', controladorInfousuario);
routerLogin.post('/logout',  controladorLogout);




function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next(); 
    }
    res.redirect('/')
  }



export default routerLogin;

