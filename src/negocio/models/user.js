import { UserDto } from "../dtos/userDTO.js"
import { crearId } from "../utils/randomId.js"

class Usuario{

    #id
    #email
    #password
    #name
    #lastname
    #image


    constructor({ _id = crearId(), email, password, name, lastname, image }) {
        this.#id = _id
        this.#email = email
        this.#password = password
        this.#name = name
        this.#lastname = lastname
        this.#image = image     
    }
    

    get id() { return this.#id }

    get email() { return this.#email }

    get password() { return this.#password }

    get name() { return this.#name }

    get lastname() { return this.#lastname }

    get image() { return this.#image }



      datos() {
        return new UserDto({
            _id: this.#id,  
            email: this.#email,  
            password: this.#password,  
            name: this.#name,  
            lastname: this.#lastname,  
            image: this.#image   
        })
      }

    }


 export default Usuario;
