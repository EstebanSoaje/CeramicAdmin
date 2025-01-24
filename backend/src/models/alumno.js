const mongoose = require('mongoose');

const AlumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, //comprueba que sea unico
  telefono: { type: String, required: true, match: /^[0-9]{10,15}$/ }, //comprueba que sea valido
  fechaRegistro: { type: Date, default: Date.now },
  pagos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pago',
    },
  ],
  asistencias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asistencia',
    },
  ],
  
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
