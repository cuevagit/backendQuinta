import {randomUUID}  from 'crypto';
import {PERSISTENCIA}  from '../db/config.js'
import {user}  from '../db/config.js'
import ContainerMongodb from '../container/containerMongodb.js'
import ContainerFirestore from '../container/containerFirestore.js'
import Container from '../container/containerFs.js'
import ContainerBDRelacionalProd from '../container/containerBDRelacionalProd.js'
import ContainerBDRelacionalCart from '../container/containerBDRelacionalCart.js'
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import loggerError from '../pinoError.js';
import loggerWarn from '../pinoWarn.js';

let prodTest
let cartTest


switch (PERSISTENCIA) {
    case 'mongodb':
        prodTest = new ContainerMongodb('productos')
        cartTest = new ContainerMongodb('cart')
        break
    case 'firebase':
        prodTest = new ContainerFirestore('productos')
        cartTest = new ContainerFirestore('cart')
        break
    case 'mysql':
        prodTest = new ContainerBDRelacionalProd(clienteSql, 'productos')
        cartTest = new ContainerBDRelacionalCart(clienteSql, 'cart', 'cartprods', 'productos')
        break
    case 'sqlite':
        prodTest = new ContainerBDRelacionalProd(clienteSqlLite3, 'productos')
        cartTest = new ContainerBDRelacionalCart(clienteSqlLite3, 'cart', 'cartprods', 'productos')
        break
    case 'fs':
        prodTest = new Container('productos.txt')
        cartTest = new Container('cart.txt')
}


async function controladorPostItemProducts(req, res) {
    const Items = await cartTest.getAll();
    const Prods = await prodTest.getAll();

    if(Items.message) 
      loggerError(Items.message)
    else {
      if(Prods.message) 
       loggerError(Prods.message)
      else {
        const indiceProducto = Prods.findIndex(p => p._id === req.body._id);

        if (indiceProducto === -1) {
            res.status(404);
            loggerWarn(`no se encontró producto con ese id (${req.body._id})`)
            res.json({ mensaje: `no se encontró producto con ese id (${req.body._id})` });
        } else {
            req.body = Prods[indiceProducto]
    
    
       if(req.session.user){ 
        
        const indiceBuscado = Items.findIndex(c => c.usuario === req.session.user);
    
            if (indiceBuscado === -1) {
                res.status(404);
                loggerWarn(`no se encontró carrito para el usuario (${req.session.user})`)
                res.json({ mensaje: `no se encontró carrito para el usuario (${req.session.user})` });
            } else {
              if(PERSISTENCIA === "mysql"  || PERSISTENCIA === "sqlite"){
                const id_cart = prodTest.buscarIdCart(req.session.user)
                if(id_cart.message) 
                   loggerError(id_cart.message)
                else {
                    const objeto = {_idCart: id_cart, _idPRod: req.body._id }
                    const insertado = await cartTest.save_products(objeto);
                    if(insertado.message)
                     loggerError(insertado.message)
                    else
                     res.json(insertado)
                }

              }
              else {
                Items[indiceBuscado].productos.push(req.body);
                const resul = await cartTest.save_products(Items[indiceBuscado]);
                if(resul.message)
                 loggerError(resul.message)
                else
                 res.json(req.body);
              }
            }
         } else {
            loggerWarn("No hay usuario logueado")
            res.json({"mensaje": "No hay usuario logueado"})
         }
        }
    }

      }

}


async function controladorGetItemsSegunId(req, res) {
    const Items = await cartTest.getById(req.session.user);

if(Items.message) 
 loggerError(Items.message)
else {
    if(req.session.user) {
        if (!Items) {
            res.status(404);
            loggerWarn(`no se encontró carrito para el usuario (${req.session.user})`)
            res.json({ mensaje: `no se encontró carrito para el usuario (${req.session.user})` });
        } else {
            res.json(Items);
        }
     } else {
        loggerWarn("No hay usuario logueado")
        res.json({"mensaje": "No hay usuario logueado"})
     }

 }
}



async function controladorDeleteItemsSegunId(req, res) {
    const Items = await cartTest.getAll();

if(Items.message) 
 loggerError(Items.message)
else {
    if(req.session.user) {

        const indiceBuscado = Items.findIndex(c => c.usuario === req.session.user);
        const borrados = Items[indiceBuscado]
    
        if (indiceBuscado === -1) {
            res.status(404);
            loggerWarn(`no se encontró carrito para el usuario (${req.session.user})`)
            res.json({ mensaje: `no se encontró carrito para el usuario (${req.session.user})` });
        } else {
            const resul = await cartTest.deleteByIdCart(req.session.user);
            if(resul.message)
             loggerError(resul.message)
            else
             res.json(borrados);
        }
     }  else {
        loggerWarn("No hay usuario logueado")
        res.json({"mensaje": "No hay usuario logueado"})
     }
}

}


async function controladorDeleteItemsSegunIdProducts(req, res) {
    const Items = await cartTest.getAll();
    const Prods = await prodTest.getAll();


if(Items.message)
  loggerError(Items.message)
else {
    if(Prods.message)
    loggerError(Prods.message)
   else {
     if(req.session.user) {
 
         const indiceBuscadoCart = Items.findIndex(c => c.usuario === req.session.user);
     
         let indiceBuscadoProd
         if(PERSISTENCIA === "mysql"  || PERSISTENCIA === "sqlite"){
              indiceBuscadoProd = Prods.findIndex(p => p._id === req.params.id_prod);
           }
         else { 
             if (indiceBuscadoCart === -1) { 
                 res.status(404);
                 loggerWarn(`no se encontró carrito para el usuario (${req.session.user})`)
                 res.json({ mensaje: `no se encontró carrito para el usuario (${req.session.user})` });
             }
             else {
                 indiceBuscadoProd = Items[indiceBuscadoCart].productos.findIndex(p => p._id === req.params.id_prod);
     
                 if (indiceBuscadoProd === -1) {
                     loggerWarn(`no se encontró producto con ese id (${req.params.id_prod}`)
                     res.json({ mensaje: `no se encontró producto con ese id (${req.params.id_prod}) , en el carrito del usuario (${req.session.user})` });        
                  } else {
                     let borrados
                     if(PERSISTENCIA === "mysql"  || PERSISTENCIA === "sqlite") {
                         const id_cart = prodTest.buscarIdCart(req.session.user)
                         if(id_cart.message)
                          loggerError(id_cart.message)
                         else
                          borrados = await cartTest.deleteByIdProd(id_cart, req.params.id_prod);
                          if(borrados.message)
                            loggerError(borrados.message)
                          else 
                            res.json(borrados);
                     }
                     else
                          borrados = await cartTest.deleteByIdProd(indiceBuscadoCart, indiceBuscadoProd);
                          if(borrados.message)
                            loggerError(borrados.message)
                          else
                            res.json(borrados);
                  }     
                }
             }
         } else {
             loggerWarn("No hay usuario logueado")
             res.json({"mensaje": "No hay usuario logueado"})
   }
  }
 }
}



export  {controladorPostItemProducts, controladorGetItemsSegunId,
controladorDeleteItemsSegunId, controladorDeleteItemsSegunIdProducts};