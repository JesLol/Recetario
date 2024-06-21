import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";

const db = createClient({
    url: 'libsql://recetario-jeslol231.turso.io',
    authToken: process.env.DB_TOKEN
});

async function loggedIn(req, res, next){
    const loggedIn = await revisarCookie(req);
    if(!loggedIn){ return res.redirect('/') };
    next();
}

async function revisarCookie(req){
    if(!req.headers.cookie){
        return false;
    }
    try{
        const cookie = req.headers.cookie.split(";").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const cookieDecodificada = jsonwebtoken.verify(cookie, process.env.JWT_SECRET);
        console.log(`Cookie decodificada: ${cookieDecodificada}`);
        const results = await db.execute({
            sql:"SELECT username FROM users WHERE username = ?",
            args: [cookieDecodificada.user]
        });
        if(results.rows.length > 0){
            return true;
        }
        return false;
    }catch(e){
        console.log(e)
        return false;
    }
}

export const middlewares = {
    loggedIn
}