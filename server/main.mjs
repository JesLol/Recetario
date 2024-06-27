import express from "express";
import { createServer } from "node:http";
import { methods as recetas} from "./controllers/recetas.mjs";
import { methods as login } from "./controllers/auth.controller.mjs";
import { middlewares as authorization, middlewares } from "./middlewares/authorization.mjs";
import { dbConn as db } from "./services/db.mjs";
import { methods as insertarReceta } from "./controllers/insertar-receta.controller.mjs";
import { methods as mostrarReceta } from "./controllers/mostrar-receta.mjs";

const port = process.env.PORT ?? 3000;

await db.execute(`
    CREATE TABLE IF NOT EXISTS recetas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(80),
        ingredientes TEXT,
        preparacion TEXT
    );
`);
await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(25),
        password VARCHAR(20)
    );
`);

const app = express();
const server = createServer(app);

app.use(express.static('client/src'));
app.use(express.json());
app.use((req,res,next)=>{
    console.log(`Nueva conexion desde ${req.ip}`);
    next();
})

app.get('/', (req, res)=>res.sendFile(process.cwd()+"/client/index.html"));
app.get('/login', (req, res)=>res.sendFile(process.cwd()+"/client/login/index.html"));
app.get('/agregar-recetas', middlewares.loggedIn, (req, res)=>res.sendFile(process.cwd()+"/client/agregar-recetas/index.html"));
app.get('/receta', (req,res)=>res.sendFile(process.cwd()+"/client/receta/index.html"))
app.get('/api/recetas', recetas.enviarRecetas);
app.post('/api/login', login.login);
app.post('/api/agregar-receta', insertarReceta.insertarReceta)
app.post('/api/receta', mostrarReceta.mostrarReceta)

server.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})