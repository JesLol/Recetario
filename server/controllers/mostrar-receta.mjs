import { dbConn as db } from "../services/db.mjs";

async function mostrarReceta (req, res){
    console.log(req.body.receta)
    try{
        const recetaResult = await db.execute({
            sql: `SELECT ingredientes, preparacion FROM recetas WHERE nombre = ?`,
            args: [req.body.receta]
        });
        console.log(recetaResult.rows[0])
        res.status(200).send(JSON.stringify(recetaResult.rows[0]));
    } catch (e){
        console.log(e)
        res.status(500).send({"mensaje": "Error en el servidor"})
    }
}

export const methods = {
    mostrarReceta
}