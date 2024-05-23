import Paciente from '../models/Paciente.js';
import bcrypt from 'bcrypt';

const generateUniqueToken = async () => {
    let token;
    let tokenExists = true;

    while (tokenExists) {
        token = Math.floor(Math.random() * 900000) + 100000; // Números de 6 dígitos
        const existingPaciente = await Paciente.findOne({ token });

        if (!existingPaciente) {
            tokenExists = false;
        }
    }

    return token.toString();
};

const crearpacientes = async (req, res) => {
    try {
        const { nombre, email, password, celular, role } = req.body;

        const existingPaciente = await Paciente.findOne({ email });

        if (existingPaciente) {
            const passwordMatch = await bcrypt.compare(password, existingPaciente.password);

            if (passwordMatch) {
                return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos y las contraseñas coinciden' });
            } else {
                return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos pero las contraseñas no coinciden' });
            }
        }

        const token = await generateUniqueToken(); // Generar un token único
        const paciente = new Paciente({ ...req.body, token }); // Agregar el token al nuevo paciente
        await paciente.save(); 

        res.json({ mensaje: 'Registrando un nuevo paciente', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el paciente por correo electrónico
        const paciente = await Paciente.findOne({ email });

        if (!paciente) {
            return res.status(400).json({ mensaje: 'El paciente no existe' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, paciente.password);

        if (!passwordMatch) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        res.json({ mensaje: 'Inicio de sesión exitoso', nombre: paciente.nombre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error al iniciar sesión' });
    }
};

const perfil = (req, res) => {
    res.json({ msg: "desde la ruta /api/pacientes/perfil" });
};

export { crearpacientes, login, perfil };
    