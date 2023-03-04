import express from 'express';
import routerLogin from './routers/routerLogin.js'
import routerApiProducts from './routers/routerApiProducts.js'
import routerApiShoppingCart from './routers/routerApiShoppingCart.js'
import routerApiBuy from './routers/routerApiBuy.js'
import logIn from './logIn.js'
import mongoose from 'mongoose'
import {MONGOOSE} from './config.js'
import {PUERTO_POR_DEFECTO} from './config.js'
import parseArgs from 'yargs/yargs'
import loggerInfo from './pinoInfo.js';
import loggerError from './pinoError.js';

const servidor = express()


//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

///LOGIN CON SESSION Y PASSPORT
logIn(servidor);

//Middlewares para los routers
servidor.use('/', routerLogin)
servidor.use('/api/products', routerApiProducts)
servidor.use('/api/shoppingcartproducts', routerApiShoppingCart)
servidor.use('/api/buy', routerApiBuy)
servidor.use(express.static('public'))

//Si viene de una ruta no implementada
servidor.all('*', (req, res) => {
  res.status(404).json({error: "404", descripcion: "ruta " + req.url + " método " + req.method + " no implementado"})
})


const yargs = parseArgs(process.argv.slice(2))

const argv = yargs.alias({p: 'port'}).default({port: PUERTO_POR_DEFECTO}).argv

const puerto = argv.port


async function conectar_mongoose(){
  ////Conexión de mogoose a la BD de MongoDB
  mongoose.set('strictQuery', false)
  try {
    const mongo =  await mongoose.connect(MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    loggerInfo("Conectado a la Base de Datos, para el proceso: " + process.pid)
  } catch (error) {
    loggerError(`Error en conexión de Base de datos: ${error}`)
  }
//////
}


function conectar() {
  conectar_mongoose()
  return new Promise((resolve, reject) => {
    const servidorConectado = servidor.listen(puerto, () => {
      resolve(servidorConectado)
    })
  })
}



export default conectar















