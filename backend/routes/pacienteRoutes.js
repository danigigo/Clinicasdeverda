import express from 'express';
import { crearpacientes, login,  perfil } from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/registrar', crearpacientes);
router.post('/login', login);
router.get('/perfil', perfil);

export default router;
