import {PERSISTENCIA} from '../../../config/config.js'
import { cart } from '../cart/cart.js'

let Cart

switch (PERSISTENCIA) {
    case 'mongodb':
        const {ContainerMongodb} = await import('../../../daos/container/containerMongodb.js')     
        const dao_mongodb = new ContainerMongodb('cart');
        Cart = new cart(dao_mongodb)
        break 
}


export { Cart } 