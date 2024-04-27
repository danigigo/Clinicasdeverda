import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes.js'
console.log("probnado xd")
const app = express()
dotenv.config();
conectarDB()    
app.use(express.json());
app.use('/doctores',doctorRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT,() => {
    console.log(`servidor funcionando en el puerto ${PORT}`)
});