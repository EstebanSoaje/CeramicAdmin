const express = require('express');
const router = express.Router();
const Alumno = require('../models/alumno');
const Pago = require('../models/pago');
const Plan = require('../models/plan');

// Registrar un nuevo pago para un alumno
router.post('/:idAlumno', async (req, res) => {
  try {
    const { idAlumno } = req.params;
    const { fecha, monto, planId } = req.body;

    // Verificar si el alumno existe
    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    // Verificar si el plan existe
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }

    // Crear un nuevo pago
    const nuevoPago = new Pago({
      fecha,
      monto,
      plan: planId,
    });

    const pagoGuardado = await nuevoPago.save();

    // Agregar el pago al alumno
    alumno.pagos.push(pagoGuardado._id);
    await alumno.save();

    res.status(201).json({
      mensaje: 'Pago registrado correctamente',
      pago: pagoGuardado,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el pago', error });
  }
});

// Obtener todos los pagos de un alumno
router.get('/:idAlumno', async (req, res) => {
  try {
    const { idAlumno } = req.params;

    const alumno = await Alumno.findById(idAlumno).populate({
      path: 'pagos',
      populate: { path: 'plan', model: 'Plan' }, // Traer información del plan
    });
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    res.json(alumno.pagos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los pagos', error });
  }
});

// Eliminar un pago
router.delete('/:idAlumno/:idPago', async (req, res) => {
  try {
    const { idAlumno, idPago } = req.params;

    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    // Eliminar el pago de la colección Pago
    const pagoEliminado = await Pago.findByIdAndDelete(idPago);
    if (!pagoEliminado) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }

    // Quitar el pago del array de pagos del alumno
    alumno.pagos = alumno.pagos.filter((pagoId) => pagoId.toString() !== idPago);
    await alumno.save();

    res.json({ mensaje: 'Pago eliminado correctamente', pago: pagoEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el pago', error });
  }
});

module.exports = router;
