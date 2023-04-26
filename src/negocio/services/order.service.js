import Odernes from '../models/orders.js'
import Productos from '../models/product.js';
import { Orders } from '../repository/order/index.js';
import { cartService } from './cart.service.js';
import { productService } from '../../negocio/services/product.service.js';
import nodemailer from '../../negocio/utils/nodemailer.js'
import {EMAILADMIN} from '../../config/config.js'


class OrderService {

    async grabarOrden(usuario) {

        const productsCart = await cartService.listarCarritoUsuario(usuario)

        if(!productsCart) 
            throw new Error (`El Usuario ${usuario._id} no tiene carrito`) 

        if(!productsCart.productos[0])
            throw new Error (`No hay productos en el carrito del usuario ${usuario._id}`) 
            
            var f = new Date();
            const fecha = f.toLocaleString();
   
           const productos = await productService.listarProducto()
   
           const prods = []
           productsCart.productos.forEach(c => {
             productos.forEach(p => {
               if(c.idProd === p._id) {
                 const prod = new Productos(p)
                 prods.push({prod: prod.datos(), cant: c.cant})
               }         
             });
           });
   
            const orden = {
             fecha: fecha,
             idCliente: usuario._id,
             prods: prods
            }
   
            const order = new Odernes(orden);
            const registroOrder = await Orders.grabarOrden(order)   

            //Vacio el carrito
            await cartService.eliminarCarrito(usuario)
            
            //Envio correos, al Admin y al Usuario Comprador
           let html="<h1>Lista de Productos Comprados <br></h1>"
           for(let j=0; j<order.prods.length; j++ ){
             html = html + `<strong style="color: blue">Nombre: </strong>${order.prods[j].prod.name} <br> <strong style="color: blue"> Descripción: </strong> ${order.prods[j].prod.description} <br> <strong style="color: blue"> Precio: </strong>  ${order.prods[j].prod.price} <br> <strong style="color: blue"> Cantidad: </strong>  ${order.prods[j].cant}<br> <strong style="color: blue"></strong> <img width="70px" src=${order.prods[j].prod.image} alt="Foto" <br><br><br>`
            };
            
            //Se notifica al Admin
            await nodemailer("Mailer", EMAILADMIN, "nuevo venta, compra hecha por " + usuario.lastname + ", " + usuario.name + " - " + usuario.email , html, null)
            html = ""
            const nrocomprobante = Math.floor(Math.random()*999999);
            html = html + `<strong>El númerp de comprobante es: #${nrocomprobante}.</strong>`
            await nodemailer("Mailer", usuario.email, "Pedido #" + nrocomprobante + " en Proceso" , html, null)
    
           //Se notifica al Usuario Comprador
           await nodemailer("Mailer", usuario.email, "nuevo pedido, " + usuario.lastname + ", " + usuario.name + " - " + usuario.email , html, null)
           html = ""
           html = html + `<strong>Su pedido #${nrocomprobante} está en proceso.</strong>`
           await nodemailer("Mailer", usuario.email, "Pedido #" + nrocomprobante + " en Proceso" , html, null)

          return registroOrder  

    }

    async listarOrder(usuario) {
                const listadoOrders = await Orders.listarOrder(usuario)
                if(listadoOrders[0]){
                    const orders = []
                    listadoOrders.forEach(d => {
                        orders.push(d.datos())
                    });
                    return orders
                } else
                    throw new Error (`No existen ordenes del usuario ${usuario._id}`)
    }


}

export const orderService = new OrderService()