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


  export default function loggerWarn(mensaje){
    logger.warn(colors.yellow(mensaje))
    pinoError.warn(mensaje)
  }