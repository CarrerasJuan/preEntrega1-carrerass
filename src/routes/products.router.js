import {Router} from 'express';
import { productManager } from '../index.js';

const productsRouter = Router()

// http://localhost:8080/api/products
/*Traer todos los productos que tengamos en el archivo products.json☑.
   Y si recibimos un limite traer los productos hasta ese limite ☑*/
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = productManager.getProducts()
        if(limit){
            const limiteProducts = products.slice(0, limit)
            return res.json(limiteProducts)
        }

        return res.json (products)
    } catch (error) {
        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS')
        
    }
})
// http://localhost:8080/api/products/un-ID-en-especifico.
productsRouter.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const products = productManager.getProductsById (pid)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.send (`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
})
// http://localhost:8080/api/products/
productsRouter.post('/', async (res, req) =>{
    try {
        const {title, description, price, thumbnail, code, stock, status, category} = req.body;

        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category})

        res.json(response)
    } catch (error) {
        console.log (error)
        res.send (`ERROR AL INTENTAR AGREGAR UN PRODUCTO`)
    }
})
// http://localhost:8080/api/products/un-ID-en-especifico2.
productsRouter.put ('/:pid', async (req, res) =>{
    const {pid} = req.params;

    try {
        const {title, description, price, thumbnail, code, stock, status, category} = req.body;

        const response = await productManager.updateProduct(id,{title, description, price, thumbnail, code, stock, status, category})

        res.json(response)
    } catch (error) {
        console.log (`ERROR AL INTENTAR EDITAR UN PRODUCTO CON ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(id)
        res.send ('PRODUCTO ELIMINADO EXITOSAMENTE')
    } catch (error) {
        console.log (error)
        res.send(`ERROR AL INTENTAR ELIMINAR CON ID ${pid}`)
        
    }
})

export {productsRouter}