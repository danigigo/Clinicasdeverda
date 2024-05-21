import express from 'express';
import { crearpacientes, loginPaciente, perfilPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/registrar', crearpacientes);
router.post('/login', loginPaciente);
router.get('/perfil', perfilPaciente);

export default router;
