import Doctor from '../models/Doctor.js';
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

        const token = await generateUniqueToken();
        const hashedPassword = await bcrypt.hash(password, 10);

        const doctorData = {
            ...req.body,
            password: hashedPassword,
            token: token
        };

        const doctor = new Doctor(doctorData);
        await doctor.save();

        res.json({ mensaje: 'Registrando un nuevo doctor', token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error' });
    }
};

const loginDoctor = (req, res) => {
    res.send('ruta de inicio de sesión');
};

const perfil = (req, res) => {
    res.json({ mensaje: "ruta de perfil de usuario" });
};

export { cdoctores, loginDoctor, perfil };
