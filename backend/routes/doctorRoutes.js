import express from 'express';
import { cdoctores, loginDoctor, perfilDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/registrardoc', cdoctores);
router.post('/login', loginDoctor);
router.get('/perfil', perfilDoctor);

export default router;
