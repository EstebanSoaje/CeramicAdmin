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
router.get('/:idAlumno/pagos', async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json(alumno.pagos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los pagos del alumno' });
  }
});

// Agregar un pago a un alumno
router.post('/agregar-pago/:idAlumno', async (req, res) => {
  try {
    const { idAlumno } = req.params; // ID del alumno
    const nuevoPago = req.body; // Datos del pago

    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    alumno.pagos.push(nuevoPago);
    await alumno.save();

    res.status(200).json({ message: 'Pago agregado correctamente', alumno });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el pago', error });
  }
});

//Editar pago de alumno
router.put('/editar-pago/:idAlumno/:_id', async (req, res) => {
  try {
    const { idAlumno, _id } = req.params;
    const { mes, monto, pagado, fechaPago } = req.body;

    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    const pago = alumno.pagos.id(_id);
    if (!pago) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }

    pago.mes = mes;
    pago.monto = monto;
    pago.pagado = pagado;
    pago.fechaPago = fechaPago;

    await alumno.save();
    res.json({ mensaje: 'Pago actualizado correctamente', alumno });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar el pago', error });
  }
});

// Eliminar pago alumno
router.delete('/eliminar-pago/:idAlumno/:idPago', async (req, res) => {
  try {
    const { idAlumno, idPago } = req.params;

    console.log("ID del Alumno recibido:", idAlumno);
    console.log("ID del Pago recibido:", idPago);

    const alumno = await Alumno.findByIdAndUpdate(
      idAlumno,
      { $pull: { pagos: { _id: idPago } } }, // Eliminamos el pago con el ID proporcionado
      { new: true } // Para devolver el documento actualizado
    );

    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    res.json({ mensaje: 'Pago eliminado correctamente', alumno });
  } catch (error) {
    console.error('Error al eliminar el pago:', error); // Registrar el error
    res.status(500).json({ mensaje: 'Error al eliminar el pago', error: error.message });
  }
});

// Registrar asistencia de un alumno
const moment = require('moment');

// Registrar asistencia de un alumno
router.post('/asistencias/:idAlumno', async (req, res) => {
  try {
    const { idAlumno } = req.params;
    const { fecha } = req.body;

    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    // Convertir fecha recibida de UTC-3 a UTC
    const fechaUTC = moment(fecha).utc().toDate();

    alumno.asistencias.push({ fecha: fechaUTC });
    await alumno.save();

    res.json({ mensaje: 'Asistencia registrada correctamente', alumno });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la asistencia', error });
  }
});

// Obtener asistencias de un alumno
router.get('/asistencias/:idAlumno', async (req, res) => {
  try {
    const { idAlumno } = req.params;

    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    // Ordenar las asistencias por fecha en orden descendente
    const asistenciasOrdenadas = alumno.asistencias
      .slice() // Crear una copia del array para no mutar el original
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Convertir fechas de asistencias de UTC a UTC-3
    const asistenciasConZonaHoraria = asistenciasOrdenadas.map((asistencia) => ({
      ...asistencia.toObject(),
      fecha: moment(asistencia.fecha).utcOffset('-03:00').format('YYYY-MM-DD'),
    }));

    res.json({ asistencias: asistenciasConZonaHoraria });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencias', error });
  }
});

// Eliminar asistencia de un alumno
router.delete('/asistencias/:idAlumno/:idAsistencia', async (req, res) => {
  try {
    const { idAlumno, idAsistencia } = req.params;

    const alumno = await Alumno.findById(idAlumno);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    const asistenciaIndex = alumno.asistencias.findIndex(
      (asistencia) => asistencia._id.toString() === idAsistencia
    );
    if (asistenciaIndex === -1) {
      return res.status(404).json({ mensaje: 'Asistencia no encontrada' });
    }

    alumno.asistencias.splice(asistenciaIndex, 1);
    await alumno.save();

    res.json({ mensaje: 'Asistencia eliminada correctamente', alumno });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la asistencia', error });
  }
});

module.exports = router;
