import  Doctor  from '../models/Doctor.js';
import bcrypt from 'bcrypt';

const generateUniqueToken = async () => {
    let token;
    let tokenExists = true;

    while (tokenExists) {
        token = Math.floor(Math.random() * 900000) + 100000; // Números de 6 dígitos
        const existingDoctor = await Doctor.findOne({ token });

        if (!existingDoctor) {
            tokenExists = false;
        }
    }

    return token.toString();
};

const cdoctores = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingDoctor = await Doctor.findOne({ email });

        if (existingDoctor) {
            const passwordMatch = await bcrypt.compare(password, existingDoctor.password);

            if (passwordMatch) {
                return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos y las contraseñas coinciden' });
            } else {
                return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos pero las contraseñas no coinciden' });
            }
        }

        const token = await generateUniqueToken(); // Generar un token único
        const doctor = new Doctor({ ...req.body, token }); // Agregar el token al nuevo doctor
        await doctor.save(); 

        res.json({ mensaje: 'Registrando un nuevo doctor', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error' });
    }
};

const loginDoctor = (req, res)=> {
    res.send({msg:"desde la ruta /api/doctores"});
};

const perfil = (req, res)=> {
    res.json({msg:"desde la ruta /api/doctores/perfil"});
};

export { cdoctores, loginDoctor, perfil };
