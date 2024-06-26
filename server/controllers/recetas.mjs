import { json } from "express";
import dotenv from "dotenv";
import { dbConn as db } from "../services/db.mjs";

async function enviarRecetas (req, res){
    const recetasResult = await db.execute(`SELECT nombre, ingredientes, preparacion FROM recetas`);
    res.status(200).send(recetasResult.rows);
}

export const methods = {
    enviarRecetas
}