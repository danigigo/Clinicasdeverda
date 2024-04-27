import Doctor from '../models/Doctor.js';
import bcrypt from 'bcrypt';

const cdoctores = async (req, res) => {
  try {
    const { email , password} = req.body;
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
    }
     // Hashear la contraseña proporcionada
     const hashedPassword = await bcrypt.hash(password, 10); 
    
     // Comparar la contraseña hasheada con la proporcionada
     const passwordMatch = await bcrypt.compare(password, hashedPassword);
     if (!passwordMatch) {
       return res.status(400).json({ mensaje: 'La contraseña proporcionada no coincide' });
     }
     const response = { mensaje: 'Registrando un nuevo doctor', coinciden: 'Las contraseñas coinciden' };

    doctor = new Doctor(req.body);
    await doctor.save();
    res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error' });
  }
};
const loginDoctor = (req, res) => {
  res.send('ruta de inicio de sesión');
};
const perfil = (req, res) => {
  res.json({mensaje:" ruta de perfil de usuario"});
};
export {cdoctores,loginDoctor,perfil}

