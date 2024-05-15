import express from 'express';
import { registrarPaciente, loginPaciente, perfilPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/registrar', registrarPaciente);
router.get('/login', loginPaciente);
router.get('/perfil', perfilPaciente);

export default router;
