import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const doctorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true, // asi no se repiten
        trim: true
    },
    Celular : {
        type: String,
        default: null,
        trim: true
    },
    token : {
        type: String,
    },
    confirmado : {
        type: Boolean,
        default: false
    },
});

doctorSchema.pre('save', async function(next) {
    // Se obtiene una referencia al documento `Doctor`
    const doctor = this;
  
    // Se verifica si la contraseña ha sido modificada
    if (!doctor.isModified('password')) {
      // Si la contraseña no ha sido modificada, pasa al siguiente middleware
      return next();
    }
  
    try {
      // Se hashea la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(doctor.password, 10);
      // Se asigna la contraseña hasheada al campo de contraseña del documento
      doctor.password = hashedPassword;
      // Se llama al siguiente middleware
      next();
    } catch (error) {
      // Si ocurre un error durante el proceso de hashing, se pasa al middleware de error
      return next(error);
    }
  });
  
const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;  