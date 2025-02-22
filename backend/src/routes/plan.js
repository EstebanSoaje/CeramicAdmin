const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');

// Crear un nuevo plan
router.post('/crear', async (req, res) => {
  try {
    const { nombre, precio, moldes, clases, descripcion } = req.body;

    const nuevoPlan = new Plan({
      nombre,
      precio,
      moldes,
      clases,
      descripcion,
    });

    const planGuardado = await nuevoPlan.save();
    res.status(201).json({ mensaje: 'Plan creado correctamente', plan: planGuardado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el plan', error });
  }
});

// Obtener todos los planes
router.get('/', async (req, res) => {
  try {
    const planes = await Plan.find();
    res.json(planes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los planes', error });
  }
});

// Obtener un plan específico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el plan', error });
  }
});

// Actualizar un plan
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, moldes, clases, descripcion } = req.body;

    const planActualizado = await Plan.findByIdAndUpdate(
      id,
      { nombre, precio, moldes, clases, descripcion },
      { new: true } // Retorna el documento actualizado
    );

    if (!planActualizado) {
      return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }

    res.json({ mensaje: 'Plan actualizado correctamente', plan: planActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el plan', error });
  }
});

// Eliminar un plan
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const planEliminado = await Plan.findByIdAndDelete(id);
    if (!planEliminado) {
      return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }

    res.json({ mensaje: 'Plan eliminado correctamente', plan: planEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el plan', error });
  }
});

module.exports = router;
