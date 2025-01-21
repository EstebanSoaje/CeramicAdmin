const mongoose = require('mongoose');

const AsistenciaSchema = new mongoose.Schema({
  fecha: { type: Date, required: true, default: Date.now }, // Fecha de la asistencia, por defecto la actual
  molde: { type: Number, required: true, min: 1 }, // Número del molde, debe ser mayor a 0
  observaciones: { type: String, maxlength: 500 }, // Observaciones adicionales (opcional)
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno', // Relación con el modelo Alumno
    required: true,
  },
});

module.exports = mongoose.model('Asistencia', AsistenciaSchema);
