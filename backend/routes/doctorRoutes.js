import express from 'express';
import { cdoctores, login, perfil } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/registrardoc', cdoctores);
router.post('/login', login);
router.get('/perfil', perfil);

export default router;
