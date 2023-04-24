import {PERSISTENCIA} from '../../../config/config.js'
import { product } from './product.js'

let Products

switch (PERSISTENCIA) {
    case 'mongodb':
        const {ContainerMongodb} = await import('../../../daos/container/containerMongodb.js')     
        const dao_mongodb = new ContainerMongodb('productos');
        Products = new product(dao_mongodb)
        break 
}


export { Products } 