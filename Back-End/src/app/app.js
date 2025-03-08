import express from 'express';
import  usuariosRoutes from '../routes/usuarios.routes.js';
import  tarjetasRoutes from '../routes/tarjetas.routes.js';
import  productosRoutes from '../routes/productos.routes.js';
import  categoriasRoutes from '../routes/categorias.routes.js';
import morgan from 'morgan';
import cors from 'cors';
/* const app = require("./app/app")
const morgan = require('morgan'); */
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//app.use('/api', usuariosRoutes)
app.use('/', usuariosRoutes)
app.use('/', tarjetasRoutes)
app.use('/', productosRoutes)
app.use('/', categoriasRoutes)

app.get("/", (req, res) => {
    res.send("Index.js :D");
});


export default app;
