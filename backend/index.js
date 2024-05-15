import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js'; // Importa las rutas de pacientes

console.log("probando xd");
const app = express();
dotenv.config();
conectarDB();
app.use(express.json());

// Usa las rutas de doctores
app.use('/doctores', doctorRoutes);

// Usa las rutas de pacientes
app.use('/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto ${PORT}`);
});
