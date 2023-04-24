import {PERSISTENCIA} from '../../../config/config.js'
import { order } from './order.js'

let Orders

switch (PERSISTENCIA) {
    case 'mongodb':
        const {ContainerMongodb} = await import('../../../daos/container/containerMongodb.js')     
        const dao_mongodb = new ContainerMongodb('orders');
        Orders = new order(dao_mongodb)
        break 
}


export { Orders } 