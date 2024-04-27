    import express from 'express';
    import { cdoctores, loginDoctor, perfil } from '../controllers/doctorController.js';

    const router = express.Router();

    router.post('/registrardoc', cdoctores);
    router.get('/login', loginDoctor);
    router.get('/perfil', perfil);

    router.get("/login",(req,res)=>{
        res.send("desde la ruta /api/login")   
    });
    router.get("/perfil",(req,res)=>{
        res.send("desde la ruta /api/login")  
    });

    export default router;