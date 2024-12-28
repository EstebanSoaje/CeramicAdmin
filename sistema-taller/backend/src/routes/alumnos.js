const express = require('express');
const Alumno = require('../models/alumnos');
const router = express.Router();
const { validarAlumno } = require('../validations/alumnoValidation'); // Validación Joi

//crear alumno
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

// Ruta para obtener estadísticas del Dashboard
router.get("/estadisticas", async (req, res) => {
  try {
    const totalAlumnos = await Alumno.countDocuments();
    const pagosPendientes = await Alumno.countDocuments({ "pagos.pagado": false });
    const alumnosAlDia = totalAlumnos - pagosPendientes;

    res.json({
      totalAlumnos,
      pagosPendientes,
      alumnosAlDia,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener estadísticas");
  }
});

// Obtener el historial de pagos de un alumno por ID
router.get('/:id/pagos', async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json(alumno.pagos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los pagos del alumno' });
  }
});

//agregar pago de alumno
router.post('/alumnos/:id/pagos', async (req, res) => {
  const { id } = req.params;
  const nuevoPago = req.body; // { mes, monto, pagado, fechaPago }
  try {
    const alumno = await Alumno.findById(id);
    alumno.pagos.push(nuevoPago);
    await alumno.save();
    res.status(200).json(alumno.pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el pago' });
  }
});



module.exports = router;
