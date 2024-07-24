import express from 'express';
import { ProductManager } from './productManager.js';
import { productsRouter } from './routes/products.router.js';

const PORT = 8080;

const app = express();
//Generamos una nueva productManager y con la const lo guardamos y a su ves lo export para usarlo en los routers☑.
export const productManager = new ProductManager;

app.use(express.json())
app.use('/api/products', productsRouter) // http://localhost:PORT/api/products

app.listen(PORT, (req, res) => {
    console.log (`Servidor escuchando en el puerto ${PORT}`);
})