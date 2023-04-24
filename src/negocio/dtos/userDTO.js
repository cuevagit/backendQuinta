export class UserDto {
    constructor({ _id, email, password, name, lastname, image }) {

        if (typeof _id !== 'string') throw new Error('tipo invalido')
        if (!_id) throw new Error('parametro requerido')
        this._id = _id

        if (typeof email !== 'string') throw new Error('tipo invalido')
        if (!email) throw new Error('parametro requerido')
        this.email = email

        if (typeof password !== 'string') throw new Error('tipo invalido')
        if (!password) throw new Error('parametro requerido')
        this.password = password

        if (typeof name !== 'string') throw new Error('tipo invalido')
        if (!name) throw new Error('parametro requerido')
        this.name = name

        if (typeof lastname !== 'string') throw new Error('tipo invalido')
        if (!lastname) throw new Error('parametro requerido')
        this.lastname = lastname

        if (typeof image !== 'string') throw new Error('tipo invalido')
        if (!image) throw new Error('parametro requerido')
        this.image = image
        
    }
}

