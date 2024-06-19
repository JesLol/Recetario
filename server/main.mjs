import express from "express";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";
import { createServer } from "node:http";
import { methods as recetas} from "./controllers/recetas.mjs";

const port = process.env.PORT ?? 3000;
dotenv.config();
const db = createClient({
    url: "libsql://recetario-jeslol231.turso.io",
    authToken: process.env.DB_TOKEN
});

await db.execute(`
    CREATE TABLE IF NOT EXISTS recetas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(80),
        ingredientes TEXT,
        preparacion TEXT
    );
`);

const app = express();
const server = createServer(app);

app.use(express.static('client/src'));
app.use((req,res,next)=>{
    console.log(`Nueva conexion desde ${req.ip}`);
    next();
})

app.get('/', (req, res)=>res.sendFile(process.cwd()+"/client/index.html"));
app.get('/api/recetas', recetas.enviarRecetas);

server.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})