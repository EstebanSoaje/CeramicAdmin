const express = require('express');
const Alumno = require('../models/alumnos');
const router = express.Router();
const { validarAlumno } = require('../validations/alumnoValidation'); // Validación Joi

router.post('/crear', async (req, res) => {
  // Validar el cuerpo de la solicitud
  const { error } = validarAlumno(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Error en los datos enviados',
      errores: error.details.map((e) => e.message),
    });
  }

  try {
    const nuevoAlumno = new Alumno(req.body);
    const alumnoGuardado = await nuevoAlumno.save();
    res.status(201).json({
      message: 'Alumno creado correctamente',
      alumno: alumnoGuardado,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un alumno
router.put('/:id', async (req, res) => {
  const { error } = validarAlumno(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Error en los datos enviados',
      errores: error.details.map((e) => e.message),
    });
  }

  try {
    const alumnoActualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumnoActualizado) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json({
      message: 'Alumno actualizado correctamente',
      alumno: alumnoActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un alumno por ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const alumnoEliminado = await Alumno.findByIdAndDelete(id);
    if (!alumnoEliminado) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener alumnos', error });
  }
});

// Obtener un alumno por ID
router.get('/:id', async (req, res) => {
  try {
    // Buscar el alumno por ID en la base de datos
    const alumno = await Alumno.findById(req.params.id);

    if (!alumno) {
      // Si no se encuentra el alumno
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    // Si se encuentra el alumno, devolverlo
    res.status(200).json(alumno);
  } catch (err) {
    // Si hay un error al buscar el alumno (por ejemplo, un ID inválido)
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
