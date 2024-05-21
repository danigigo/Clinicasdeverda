import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
dotenv.config();

console.log("probando xd");

// Conecta a la base de datos
conectarDB();

// Configura middleware
app.use(cors());
app.use(express.json());

// Usa las rutas de doctores
app.use('/doctores', doctorRoutes);

// Usa las rutas de pacientes
app.use('/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
