import { json } from "express";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const db = createClient ({
    url: "libsql://recetario-jeslol231.turso.io",
    authToken: process.env.DB_TOKEN
})

async function enviarRecetas (req, res){
    console.log("Haciendo peticion de recetas");
    const recetasResult = await db.execute(`SELECT nombre, ingredientes, preparacion FROM recetas`);
    console.log(recetasResult.rows)
    res.status(200).send(recetasResult.rows);
}

export const methods = {
    enviarRecetas
}