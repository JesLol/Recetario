import { dbConn as db } from "../services/db.mjs";

async function insertarReceta(req, res){
    try{
        db.execute({
            sql: `INSERT INTO recetas (nombre, ingredientes, preparacion) VALUES (:nombre, :ingredientes, :preparacion)`,
            args: {nombre: req.body.nombre, ingredientes: JSON.stringify(req.body.ingredientes), preparacion: JSON.stringify(req.body.pasos)}
        })
    } catch (e){
        return res.status(500).send({status:"error", mensaje: "Ha ocurrido un error. Intente mas tarde."})
        console.log(e);
    }
    return res.status(200).send({status: "ok", mensaje: "Receta ingresada"})
}

export const methods = {
    insertarReceta
}