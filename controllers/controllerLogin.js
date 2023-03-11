import ContainerMongodb from '../container/containerMongodb.js'
import ContainerUser from '../container/containerUser.js'
import loggerError from '../pinoError.js';
import loggerWarn from '../pinoWarn.js';
import nodemailer from '../nodemailer.js'
import {EMAILADMIN} from '../config.js'

const users = new ContainerUser('users')
const cart = new ContainerMongodb('cart')


 
 function controladorLogout(req, res) {
  if(req.session.user) { 
    req.session.destroy();
    res.status(200).json({"mensaje": "Usuario deslogueado"})
  } else {
    loggerWarn({"mensaje": "No hay Usuario logueado"})
    res.json({"mensaje": "No hay Usuario logueado"})
  }
}
   

function controladorLoginp(req, res) {
  
  req.session.user = req.body.username
 
  if(!req.isAuthenticated) { 
      return res.status(401)
  } else {
     res.status(200).json({"usuario": req.session.user })
  }
  
}


async function controladorRegistro(req, res) {
  res.status(201);
  const objeto = req.body; 

  //Doy de alta un carrito para este usuario
  const productos = []

  const carrito = {
    usuario: req.body.username,
    productos: productos
  }
  if(carrito.message)
   loggerError(objeto.message)
  else 
    cart.save(carrito)  
  ////////////

  const {password} = await users.buscar_usuario(req.body.username)

  //Envio correo al administrador con los datos del usuario dado de alta
  const html = `<h1 style="color: blue;">Datos del Usuario creado: </h1> <strong>Usuario: </strong> ${req.body.username} <br> <strong>Contraseña: </strong> ${password} <br> <strong>Nombre: </strong> ${req.body.nombre} <br> <strong>Apellido: </strong> ${req.body.apellido} <br> <strong>Tipo de Usuario: </strong> "Usuario" <br>`
  await nodemailer("Mailer", EMAILADMIN, "nuevo registro", html, null)
  res.json(objeto)

 }


async function controladorInfousuario(req, res){

  if(req.session.user){
    const usuario = await users.buscar_usuario(req.session.user)
    if(usuario.message)
     loggerError(usuario.message)
    else
     res.json(usuario)
  } else {
    loggerWarn("No hay usuario logueado")
    res.json({"mensaje": "No hay usuario logueado"})
  }

 }


 
async function esAdmin(req, res, next){

  if(req.session.user){
    const usuario = await users.esAdmin(req.session.user)
    if(usuario.message)
     loggerError(usuario.message)
    else
       if(usuario)
         next()
       else
         res.json({"mensaje": "El usuario no puede registrar usuarios porque no es Admin"})
   } else {
    loggerWarn("No hay usuario logueado")
    res.json({"mensaje": "No hay usuario logueado"})
  }

 }

  
export {controladorLoginp, controladorRegistro, controladorLogout, controladorInfousuario, esAdmin}
