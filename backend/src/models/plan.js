const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }, // Nombre único para el plan
  precio: { type: Number, required: true, min: 0 }, // Precio mínimo 0
  moldes: { type: Number, required: true, min: 0 }, // Cantidad de moldes, mínimo 0
  clases: { type: Number, required: true, min: 0 }, // Cantidad de clases, mínimo 0
  descripcion: { type: String, maxlength: 500 }, // Descripción opcional con límite de 500 caracteres
}, { timestamps: true }); // Agrega campos createdAt y updatedAt automáticamente

module.exports = mongoose.model('Plan', PlanSchema);
