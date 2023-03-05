import loggerError from '../pinoError.js';
import loggerWarn from '../pinoWarn.js';
import nodemailer from '../nodemailer.js'
import ContainerMongoDB from '../container/containerMongodb.js'
import ContainerUser from '../container/containerUser.js'
import {EMAILADMIN} from '../config.js'


const cartTest = new ContainerMongoDB('cart')
const users = new ContainerUser('users')
const orders = new ContainerMongoDB('orders')



 async function controladorBuy(req, res) {

  if(req.session.user) { 
    const prodcutsCart = await cartTest.getByIdUser(req.session.user)
    if(prodcutsCart) { 
    if(prodcutsCart.message) 
      loggerError(prodcutsCart.message)
     else {
      if(prodcutsCart.productos[0]){
       let html="<h1>Lista de Productos Comprados <br></h1>"
       for(let j=0; j<prodcutsCart.productos.length; j++ ){
         html = html + `<strong style="color: blue">Nombre: </strong>${prodcutsCart.productos[j].name} <br> <strong style="color: blue"> Descripción: </strong> ${prodcutsCart.productos[j].description} <br> <strong style="color: blue"> Precio: </strong>  ${prodcutsCart.productos[j].price}<br> <strong style="color: blue"></strong> <img width="70px" src=${prodcutsCart.productos[j].image} alt="Foto" <br><br><br>`
        };
       const usuario = await users.buscar_usuario(req.session.user)
       if(usuario.message)
         loggerError(usuario.message)
       else {
         nodemailer("Mailer", EMAILADMIN, "nuevo pedido de " + usuario.apellido + ", " + usuario.nombre + " - " + usuario.username , html, null)
         html = ""
         const nrocomprobante = Math.floor(Math.random()*999999);
         html = html + `<strong>Su pedido #${nrocomprobante} está en proceso.</strong>`
         nodemailer("Mailer", usuario.username, "Pedido #" + nrocomprobante + " en Proceso" , html, null)
 
         //Vacio el carrito
           cartTest.deleteByIdCart(req.session.user)
         ///
         var f = new Date();
         const fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
      
         const order = {
          buyer: { usuario: usuario.username, apellido: usuario.apellido, nombre: usuario.nombre, foto: usuario.foto},
          items: { productos: prodcutsCart.productos, fecha}
         }

         const resul = orders.save(order)
         if(resul.message)
           loggerError(resul.message)
         else
           res.status(200).json({"mensaje": "Compra realizada con éxito"})
       }
      } else {
        loggerWarn("No hay productos en el carrito")
        res.json({"mensaje": "No hay productos en el carrito"})
      }
     }
    } else 
     res.json({"mensaje": "El usuario no tiene carrito" })
   }
 else {
   loggerWarn("No hay usuario logueado")
   res.json({"mensaje": "No hay usuario logueado"})
 }
}

   
  
export {controladorBuy}


