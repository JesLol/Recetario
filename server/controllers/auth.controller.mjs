import { createClient } from "@libsql/client";
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from "validator";
import { json } from "express";

dotenv.config();

const db = createClient({
    url: 'libsql://recetario-jeslol231.turso.io',
    authToken: process.env.DB_TOKEN
});
//Iniciar sesion
async function login(req, res){
    console.log("Login req body: "+req.body);
    let user = req.body.username;
    let password = req.body.password;
    //Verificar y sanitizar nombre de usuario
    if(sanitizarUsername(user)!=false){user = sanitizarUsername(user);}
    else {
        return res.status(400).send({status:"Error", mensaje:"Username no valido"});
    }
    //Verificar y sanitizar password
    if(sanitizarPass(password)!=false){password = sanitizarPass(password);}
    else {
        return res.status(400).send({status:"Error", mensaje:"Password no valida"});
    }
    //Una vez sanitiazados, hacer la consulta
    const results = await db.execute({
        sql: `SELECT password FROM users WHERE username = ?`,
        args: [user]
    })
    //Si encuentra el usuario, verificar la password
    if(results.rows.length > 0){
        if(results.rows[0].password!==password){
            return res.status(400).send({status:"Error", msg:"Username o password incorrecta"});
        }
    }else{
        return res.status(400).send({status:"Error", msg:"Username o password incorrecta"});
    }
    //Generar el JWT
    const token = jsonwebtoken.sign(
        {user:user},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION}
    );
    const cookieOption = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    }
    res.cookie("jwt", token, cookieOption);
    res.send({status:"ok", mensaje: "Usuario loggeado",redirect: "/"});
    console.log("User loggueado")
}

function sanitizarUsername(username){
    
    let userSanitizado = validator.trim(username);
    userSanitizado = validator.escape(userSanitizado);
    userSanitizado = validator.whitelist(userSanitizado, 'a-zA-Z0-9_.');
    if(validator.isLength(userSanitizado, {min:3, max:20})){return userSanitizado}
    else{ return false }
}
function sanitizarPass(pass){
    const passSanitizada = validator.trim(pass);
    if(validator.isLength(passSanitizada, {min: 8, max: 20})){return passSanitizada;}
    else{ return false }
}

export const methods = {
    login
}