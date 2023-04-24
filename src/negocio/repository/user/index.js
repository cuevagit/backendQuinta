import {PERSISTENCIA} from '../../../config/config.js'
import { user } from './user.js'

let User

switch (PERSISTENCIA) {
    case 'mongodb':
        const {ContainerUser} = await import('../../../daos/container/containerUser.js')     
        const dao_mongodb = new ContainerUser('users');
        User = new user(dao_mongodb)
        break 
}


export { User } 