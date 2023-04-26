import Productos from '../models/product.js'
import { Products } from '../repository/product/index.js';


class ProductService {

    async grabarProducto(objeto) {
        try {
            const product = new Productos(objeto);
            const registroProduct = await Products.grabarProducto(product)
            return registroProduct  
        } catch (error) {
            return error
        }
    }

    async listarProducto() {
        try {
            const listadoProducts = await Products.listarProducto()
                
            if(listadoProducts){
                const products = []
                listadoProducts.forEach(d => {
                products.push(d.datos())
            });
                return products
            } else
                return null
        } catch (error) {
            return error
        }
    }


    async actualizarProducto(objeto) {
        try {
            const product = new Productos(objeto);
            const updateProduct = await Products.actualizarProducto(product)
            return updateProduct  
        } catch (error) {
            return error
        }
    }
    

    async eliminarProducto(id) {
        try {
            const deleteProduct = await Products.eliminarProducto(id)
            return deleteProduct  
        } catch (error) {
            return error
        }
    }



    async listarProductoPorId(id) {
        try {
            const producto = await Products.listarProductoPorId(id)
            if(producto)
             return producto.datos()
            else 
             return null
        } catch (error) {
            return error
        }
    }



}

export const productService = new ProductService()