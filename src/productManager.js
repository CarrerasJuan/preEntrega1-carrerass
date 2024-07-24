import {promises as fs} from "fs"
import {v4 as uuidv4} from "uuid"
//Clase ProductManager Complete☑.
export class ProductManager {
//1-El array vacio que generamos aqui ⬇.
    constructor(){
        this.path = 'products.json';
        //4-Obteniendo todo lo que tenia el otro archivo y ademas el nuevo producto 🤩.
        this.products = [];
    }
//Agregar producto Complete ☑.
    addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
        const id = uuidv4()

        let newProduct = {id, title, description, price, thumbnail, code, stock, status, category}

        /*2-lo igualamos al archivo de products JSON⬇.
          3-⬇Luego Pusheo el nuevo producto a la array de arriba ⤴.*/
        this.products = await this.getProducts()
        this.products.push(newProduct)

        //5-Asi ya podemos generar el writefile y re tornar el newproduct🤑.
        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }
//Obtener todos los productos  Complete☑.
    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf8');
        const responseJson = JSON.parse (response);

        return responseJson;
    }
//Obtener un producto en especifico Complete☑.
    getProductsById = async (id) => {
        const response = this.getProducts()
     /*6- Con esta Respuesta, nos daremos cuenta si existe 
     un producto cuyo ID es igual al ID que recibimos por parametros utilizando find ⬇.*/
        const product = response.find (product => product.id === id)

        if (product) {
            return product
        }else {
            console.log ('Producto no encontrado');
        }
    }
//Actualizar un Producto en especifico Complete☑ .     
    /*7-Con findIndex traeremos el indice de donde se encuentra el objeto⬇.
      Si no lo encuentra, ingresa dentro, lo edita y se guarda */
    updateProduct = async (id, { ... data}) => {
        const response = this.getProducts();
        const index = response.findIndex(product => product.id === id);

        if(index !== -1){
            products[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(response))
            return response [index]
        } else {
            console.log ('Producto no encontrado');
        }
    }
//Eliminar un producto en especifico Complete☑.
    deleteProduct = async (id) => {
        const products = this.getProducts()
        const index = products.findIndex(product => product.id === id);

        if(index !== -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log('Producto no encontrado')
        }

    }
}