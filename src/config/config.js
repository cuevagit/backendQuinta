import dotenv from 'dotenv'
dotenv.config()

let MONGOCONECTIONSEGUNENVIRONMENT
if(process.env.ENVIRONMENT === 'prod')
    MONGOCONECTIONSEGUNENVIRONMENT = process.env.MONGOCONECTIONPROD
else //dev
    MONGOCONECTIONSEGUNENVIRONMENT = process.env.MONGOCONECTIONENV

export const DBNAME=process.env.DBNAME
export const USERDB=process.env.USERDB
export const MONGOCONECTION=MONGOCONECTIONSEGUNENVIRONMENT
export const MONGODB=process.env.MONGODB
export const PERSISTENCIA=process.env.PERSISTENCIA
export const SALTENV=process.env.SALTENV
export const NODE_ENV=process.env.NODE_ENV
export const MODO_POR_DEFECTO=process.env.MODO_POR_DEFECTO
export const PUERTO_POR_DEFECTO=process.env.PUERTO_POR_DEFECTO
export const TIPO_USUARIO_POR_DEFECTO=process.env.TIPO_USUARIO_POR_DEFECTO
export const SERVICEEMAIL=process.env.SERVICEEMAIL
export const PORTEMAIL=process.env.PORTEMAIL
export const EMAILADMIN=process.env.EMAILADMIN
export const PASSWORDADMIN=process.env.PASSWORDADMIN
export const USUARIOADMIN=process.env.USUARIOADMIN
