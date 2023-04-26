import express from 'express';
import { controladorSubirImagen } from '../controllers/controllerImages.js';
import { multer_function } from '../../negocio/utils/multer.js';


const routerImage = express.Router();


routerImage.post('/', multer_function(), controladorSubirImagen);     


export default routerImage;
