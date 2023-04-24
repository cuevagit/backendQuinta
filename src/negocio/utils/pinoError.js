import pino from 'pino'
import colors from 'colors'


const logger = pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })
  
  const pinoError = pino("./logs/error.log");


  export default function loggerError(mensaje){
    logger.error(colors.red(mensaje))
    pinoError.error(mensaje)
  }