const mongoose = require('mongoose');

const AlumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  contacto: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  pagos: [
    {
      mes: { type: String },
      monto: { type: Number },
      pagado: { type: Boolean, default: false },
      fechaPago: { type: Date },
    },
  ],
});

const Alumno = mongoose.model('Alumno', AlumnoSchema);
module.exports = Alumno;
