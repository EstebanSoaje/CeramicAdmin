const express = require('express');
const router = express.Router();
const Alumno = require('../models/alumno');
const Asistencia = require('../models/asistencia');

// Agregar una nueva asistencia a un alumno
router.post('/:idAlumno', async (req, res) => {
  try {
    const { idAlumno } = req.params;
    const { fecha, molde, observaciones } = req.body;

    // Verificar que el alumno exista
    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    // Crear la nueva asistencia
    const nuevaAsistencia = new Asistencia({
      fecha,
      molde,
      observaciones,
      alumno: idAlumno, // Relación con el alumno
    });

    // Guardar la asistencia
    const asistenciaGuardada = await nuevaAsistencia.save();

    // Agregar la asistencia al array del alumno
    alumno.asistencias.push(asistenciaGuardada._id);
    await alumno.save();

    res.status(201).json({
      mensaje: 'Asistencia registrada correctamente',
      asistencia: asistenciaGuardada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar la asistencia', error });
  }
});


// Obtener todas las asistencias de un alumno
router.get('/:idAlumno', async (req, res) => {
  try {
    const { idAlumno } = req.params;

    const alumno = await Alumno.findById(idAlumno).populate('asistencias');
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    res.json(alumno.asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las asistencias', error });
  }
});

// Eliminar una asistencia
router.delete('/:idAlumno/:idAsistencia', async (req, res) => {
  try {
    const { idAlumno, idAsistencia } = req.params;

    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    // Eliminar la asistencia de la colección Asistencia
    const asistenciaEliminada = await Asistencia.findByIdAndDelete(idAsistencia);
    if (!asistenciaEliminada) {
      return res.status(404).json({ mensaje: 'Asistencia no encontrada' });
    }

    // Quitar la asistencia del array de asistencias del alumno
    alumno.asistencias = alumno.asistencias.filter(
      (asistenciaId) => asistenciaId.toString() !== idAsistencia
    );
    await alumno.save();

    res.json({ mensaje: 'Asistencia eliminada correctamente', asistencia: asistenciaEliminada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la asistencia', error });
  }
});

module.exports = router;
