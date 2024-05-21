import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const pacienteSchema = new mongoose.Schema({
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
        unique: true,
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
        default: true
    },
});

pacienteSchema.pre('save', async function(next) {
    const paciente = this;
  
    if (!paciente.isModified('password')) {
      return next();
    }
  
    try {
      const hashedPassword = await bcrypt.hash(paciente.password, 10);
      paciente.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);
export default Paciente;
