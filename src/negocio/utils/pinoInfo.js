import pino from 'pino'
import colors from 'colors'


const logger = pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })


  export default async function loggerInfo(mensaje) {
    await logger.info(colors.cyan(mensaje));
  }










