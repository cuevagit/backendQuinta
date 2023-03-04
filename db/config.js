import fs from 'fs';
import {MONGOCONECTION} from '../config.js'
import {MYSQL} from '../config.js'
import {SQLITE} from '../config.js'
import {DBNAME} from '../config.js'
import {USERDB} from '../config.js'
import {FIRESTORE} from '../config.js'
import {PERSISTENCIAELEGIDA} from '../config.js'
import loggerInfo from '../pinoInfo.js';


//MongoDB
export const CNX_STR = MONGOCONECTION

//FireStore
export const serviceAccount = JSON.parse(await fs.promises.readFile(FIRESTORE, 'utf-8'));

//MySQL
export const mysqlConfig = {
    client: 'mysql2',
    connection: MYSQL
}

//Sqlite3
export const sqlite3Config = {
    client: 'sqlite3',
    connection: {
        filename: SQLITE
    },
    useNullAsDefault: true   
}

export const user = USERDB
export const DB_NAME = DBNAME

export const PERSISTENCIA = PERSISTENCIAELEGIDA

loggerInfo("Estoy conectado con: " + PERSISTENCIA) 
