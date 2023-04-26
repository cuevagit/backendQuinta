import {MONGOCONECTION} from '../../config/config.js'
import {DBNAME} from '../../config/config.js'
import {USERDB} from '../../config/config.js'
import {PERSISTENCIA} from '../../config/config.js'
import loggerInfo from '../../negocio/utils/pinoInfo.js';


//MongoDB
export const CNX_STR = MONGOCONECTION
export const user = USERDB
export const DB_NAME = DBNAME
export default PERSISTENCIA 

loggerInfo("Estoy conectado con: " + PERSISTENCIA) 
