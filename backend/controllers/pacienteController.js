import Paciente from '../models/Paciente.js';
import bcrypt from 'bcrypt';

const generateUniqueToken = async () => {
    let token;
    let tokenExists = true;

    while (tokenExists) {
        token = Math.floor(Math.random() * 900000) + 100000;
        const existingPaciente = await Paciente.findOne({ token });

        if (!existingPaciente) {
            tokenExists = false;
        }
    }

    return token.toString();
};

const registrarPaciente = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingPaciente = await Paciente.findOne({ email });

        if (existingPaciente) {
            const passwordMatch = await bcrypt.compare(password, existingPaciente.password);

            if (passwordMatch) {
                return res.status(400).json({ mensaje: 'El paciente ya está registrado en la base de datos y las contraseñas coinciden' });
            } else {
                return res.status(400).json({ mensaje: 'El paciente ya está registrado en la base de datos pero las contraseñas no coinciden' });
            }
        }

        const token = await generateUniqueToken();
        const paciente = new Paciente({ ...req.body, token });
        await paciente.save(); 

        res.json({ mensaje: 'Registrando un nuevo paciente', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error' });
    }
};

const loginPaciente = (req, res)=> {
    res.send({msg:"desde la ruta /api/pacientes/login"});
};

const perfilPaciente = (req, res)=> {
    res.json({msg:"desde la ruta /api/pacientes/perfil"});
};

export { registrarPaciente, loginPaciente, perfilPaciente };
