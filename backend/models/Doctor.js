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
        unique: true, // así no se repiten
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
    const doctor = this;
  
    if (!doctor.isModified('password')) {
      return next();
    }
  
    try {
      const hashedPassword = await bcrypt.hash(doctor.password, 10);
      doctor.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
