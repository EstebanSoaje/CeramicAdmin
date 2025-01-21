const express = require('express');
const router = express.Router();
const Alumno = require('../models/alumno');
const Pago = require('../models/pago');
const Asistencia = require('../models/asistencia');

// Crear un alumno
router.post('/crear', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono } = req.body;

    const nuevoAlumno = new Alumno({
      nombre,
      apellido,
      email,
      telefono,
    });

    const alumnoGuardado = await nuevoAlumno.save();
    res.status(201).json({ mensaje: 'Alumno creado correctamente', alumno: alumnoGuardado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el alumno', error });
  }
});

// Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.find().populate('pagos').populate('asistencias');
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los alumnos', error });
  }
});

// Obtener un alumno por ID
router.get('/:id', async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id)
      .populate('pagos')
      .populate('asistencias');
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el alumno', error });
  }
});

// Actualizar un alumno
router.put('/:id', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono } = req.body;
    const alumnoActualizado = await Alumno.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido, email, telefono },
      { new: true }
    );
    if (!alumnoActualizado) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json({ mensaje: 'Alumno actualizado correctamente', alumno: alumnoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el alumno', error });
  }
});

// Eliminar un alumno
router.delete('/:id', async (req, res) => {
  try {
    const alumnoEliminado = await Alumno.findByIdAndDelete(req.params.id);
    if (!alumnoEliminado) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json({ mensaje: 'Alumno eliminado correctamente', alumno: alumnoEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el alumno', error });
  }
});

module.exports = router;
