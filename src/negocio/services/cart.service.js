import Carrito from '../models/cart.js'
import Carrito_prods from '../models/productsxcart.js';
import { Cart } from '../repository/cart/index.js';
import {productService} from '../../negocio/services/product.service.js'



class CartService {
    
    async grabarCarrito(user, idProd) {

        const Items = await cartService.listarCarrito();
        const Prods = await productService.listarProducto();
    
        if(!Items)
            throw new Error ("No hay carritos")
    
        if(!Prods)
            throw new Error ("No hay productos") 

        const indiceProducto = Prods.findIndex(p => p._id === idProd);
    
        if (indiceProducto === -1) 
            throw new Error (`no se encontró producto con ese id (${idProd})`);
    
        const indiceBuscado = Items.findIndex(c => c.usuario === user._id);

        if (indiceBuscado === -1) 
            throw new Error (`no se encontró carrito para el usuario (${user.email})`);

        let producto = Items[indiceBuscado].productos.find(p => p.idProd === idProd)
                    
        if (producto) {
            Items[indiceBuscado].productos.find(p => p.idProd === idProd).cant ++
        } else {
            const cant = 1
            producto = {idProd, cant}
            producto = new Carrito_prods(producto)
            producto = producto.datos()
            Items[indiceBuscado].productos.push(producto);
        }
        
        const cart = new Carrito(Items[indiceBuscado]);
        await Cart.grabarCarrito(cart)  
        return producto      
    }

   

    async grabarCarritoUsuario(objeto) {
        try {
            const cart = new Carrito(objeto);
            const registroCart = await Cart.grabarCarritoUsuario(cart)
            return registroCart  
        } catch (error) {
            return error
        }
    }


    async listarCarrito() {

        try {
            const listadoCarts = await Cart.listarCarrito()
                
            if(listadoCarts){
                const carts = []
                listadoCarts.forEach(d => {
                    carts.push(d.datos())
                });
                    return carts
                } else
                    return null
        } catch (error) {
            return error
        }
    }


    async listarCarritoUsuario(usuario) {

        const listadoCarts = await Cart.listarCarritoUsuario(usuario._id)

        if(!listadoCarts)
            throw new Error("No hay carrito")
                
        if(!listadoCarts.productos[0])
            throw new Error("No hay productos en el carrito")

            return listadoCarts

    }


    async eliminarProducto(user, idProd) {

        const Items = await cartService.listarCarrito();
        const Prods = await productService.listarProducto();
      
        if(!Items)
            throw new Error ("No hay carritos") 
      
        if(!Prods)
            throw new Error ("No hay productos") 
      

        const indiceBuscadoCart = Items.findIndex(c => c.usuario === user._id);
           
        let indiceBuscadoProd
      
        if (indiceBuscadoCart === -1) 
            throw new Error(`no se encontró carrito para el usuario (${user.email})`);
       
        indiceBuscadoProd = Items[indiceBuscadoCart].productos.findIndex(p => p.idProd === idProd);

        if (indiceBuscadoProd === -1) 
           throw new Error(`no se encontró producto con ese id (${idProd}), en el carrito del usuario (${user.email})`)         

        if (Items[indiceBuscadoCart].productos.find(p => p.idProd === idProd).cant > 1) {
            Items[indiceBuscadoCart].productos.find(p => p.idProd === idProd).cant--
            const cart = new Carrito(Items[indiceBuscadoCart]);
            const carrito = await Cart.grabarCarrito(cart) 
            return carrito.productos[indiceBuscadoProd];
        } else {
            const deleteProduct = await Cart.eliminarProducto(indiceBuscadoCart, indiceBuscadoProd)
            return deleteProduct[0]
        }
      
    }     
                      
      

    async eliminarCarrito(usuario) {
 
        const Items = await cartService.listarCarrito();

        if(!Items)
            return "No hay carritos"
 
        const indiceBuscado = Items.findIndex(c => c.usuario === usuario._id);
      
        if (indiceBuscado === -1) 
            throw new Error(`no existe carrito para el usuario (${usuario.email})`);

        if(!Items[indiceBuscado].productos[0]) 
            throw new Error(`el carrito para el usuario (${usuario.email}) no tiene productos`);

        const borrados = Items[indiceBuscado].productos

        await Cart.eliminarCarrito(usuario._id)

        return borrados

    }

}


export const cartService = new CartService()