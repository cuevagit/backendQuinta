//import { clienteSql as knex } from './clienteSql.js'
import { clienteSqlLite3 as knex } from './clienteSql.js'
import loggerInfo from '../pinoInfo.js';
import loggerWarn from '../pinoWarn.js';

async function createTables(){
await knex.schema.hasTable('productos')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('productos', tabla => {
                tabla.increments('id'),
                    tabla.string('title'),
                    tabla.integer('price'),
                    tabla.string('thumbnail')
            })
                .then(() => {
                    loggerInfo('tabla "productos" creada!')
                })
        } else {
            loggerWarn('la tabla "productos" ya existe. no se realizaron cambios')
        }
    }),
  

   await knex.schema.hasTable('chat')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('chat', tabla => {
                tabla.increments('id'),
                    tabla.string('fecha'),
                    tabla.string('email'),
                    tabla.string('mensaje')
            })
                .then(() => {
                    loggerInfo('tabla "chat" creada!')
                })
        } else {
            loggerWarn('la tabla "chat" ya existe. no se realizaron cambios')
        }
    })

}

export default createTables;