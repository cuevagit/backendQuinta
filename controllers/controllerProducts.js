import {randomUUID}  from 'crypto';
import {PERSISTENCIA} from '../db/config.js'
import Container from '../container/containerFs.js'
import ContainerMongoDB from '../container/containerMongodb.js'
import ContainerFirestore from '../container/containerFirestore.js'
import ContainerBDRelacional from '../container/containerBDRelacionalProd.js'
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import ContainerUser from '../container/containerUser.js'
import loggerError from '../pinoError.js';
import loggerWarn from '../pinoWarn.js';

const users = new ContainerUser('users')

let prodTest

switch (PERSISTENCIA) {
    case 'mongodb':
        prodTest = new ContainerMongoDB('productos')
        break
    case 'firebase':
        prodTest = new ContainerFirestore('productos')
        break
    case 'mysql':
        prodTest = new ContainerBDRelacional(clienteSql, 'productos')
        break
    case 'sqlite':
        prodTest = new ContainerBDRelacional(clienteSqlLite3, 'productos')
        break
    case 'fs':
        prodTest = new Container('productos.txt')
}



async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    objeto._id = randomUUID();
    const resul = await prodTest.save(objeto);
    if(resul.message)
     loggerError(resul.message)
    else
     res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await prodTest.getAll();
    if(productos)
      if(productos.message)
      loggerError(productos.message)
      else
      res.json(productos);
    else 
      res.json({"mensaje": "No hay producrtos"})
}

async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.getById(id);

        if (!productos) {
            res.status(404);
            loggerWarn(`no se encontró producto con ese id (${id})`)
            res.json({ mensaje: `no se encontró producto con ese id (${id})` });
        } else {    
            if(productos.message)
            loggerError(productos.message)
           else {
            res.json(productos);
        }
    }
}


async function controladorPutProductosSegunId({ body, params: { id } }, res) {

    const productos = await prodTest.getById(id);

    if (!productos) {
        res.status(404);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if(productos.message)
        loggerError(productos.message)
       else {
        body._id = id;
        await prodTest.update(body);
        res.json(body);
    }
  }

}


async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.deleteById(id);

    if (!productos) {
        res.status(404);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if(productos.message)
        loggerError(productos.message)
       else {
        res.json(productos);
    }
   }
}


async function soloParaAdmins(req, res, next) {

    const esAdmin = await users.esAdmin(req.session.user)

if(req.session.user){
   if(esAdmin.message) 
    loggerError(esAdmin.message)
   else {
     if (await esAdmin) {
         next()
     } else {
         loggerWarn("error: 403, descripcion:  ruta " + req.originalUrl + " método " + req.method + " no autorizada")
         res.status(403).json({error: "403", descripcion:  "ruta " + req.originalUrl + " método " + req.method + " no autorizada"})
     }
   }
} else {
    loggerWarn("No hay un usuario logueado")
    res.status(201).json({"mensaje": "No hay un usuario logueado"})
}

}



export  {controladorGetProductos, controladorPostProductos, controladorGetProductosSegunId, controladorPutProductosSegunId,
controladorDeleteProductosSegunId, soloParaAdmins};