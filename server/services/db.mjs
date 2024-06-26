import { createClient } from "@libsql/client";
import dotenv from "dotenv";
dotenv.config();
const db = createClient({
    url: "libsql://recetario-jeslol231.turso.io",
    authToken: process.env.DB_TOKEN
});

export const dbConn = db;