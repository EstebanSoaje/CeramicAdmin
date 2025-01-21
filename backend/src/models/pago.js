const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true, default: Date.now }, // Fecha del pago
  monto: { type: Number, required: true, min: 0 }, // Monto del pago, no menor a 0
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan', // Relación con el modelo Plan
    required: true,
  },
});

module.exports = mongoose.model('Pago', PagoSchema);
