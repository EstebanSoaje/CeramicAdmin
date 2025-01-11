import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const ControlAsistencias = () => {
  const { id } = useParams(); // ID del alumno
  const [asistencias, setAsistencias] = useState([]);
  const [nuevaAsistencia, setNuevaAsistencia] = useState("");

// Obtener las asistencias del alumno
useEffect(() => {
  const fetchAsistencias = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/alumnos/asistencias/${id}`);
      
      // Convertir fechas a UTC-3
      const asistenciasConZonaHoraria = response.data.asistencias.map((asistencia) => ({
        ...asistencia,
        fecha: moment(asistencia.fecha).utcOffset('-03:00').format('YYYY-MM-DD'),
      }));
      
      setAsistencias(asistenciasConZonaHoraria);
    } catch (error) {
      console.error("Error al obtener las asistencias:", error);
    }
  };

  fetchAsistencias();
}, [id]);

  // Inicializar la fecha actual en el input de fecha
  useEffect(() => {
    const fechaActual = moment().format("YYYY-MM-DD"); // Obtener la fecha actual en formato YYYY-MM-DD
    setNuevaAsistencia(fechaActual);
  }, []);

  // Manejar el cambio de la fecha
  const handleChange = (e) => {
    setNuevaAsistencia(e.target.value);
  };

// Agregar nueva asistencia
const handleAddAsistencia = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:5000/api/alumnos/asistencias/${id}`, {
      fecha: nuevaAsistencia,
    });

    setNuevaAsistencia(moment().format("YYYY-MM-DD")); // Restablecer la fecha al día actual

    // Ordenar las asistencias por fecha en orden descendente (más reciente primero)
    const asistenciasOrdenadas = response.data.alumno.asistencias.sort((a, b) => 
      new Date(b.fecha) - new Date(a.fecha)
    );

    setAsistencias(asistenciasOrdenadas); // Actualizar la lista ordenada
  } catch (error) {
    console.error("Error al agregar la asistencia:", error);
  }
};


  // Eliminar asistencia
  const handleDeleteAsistencia = async (idAsistencia) => {
    if (window.confirm("¿Estás seguro de eliminar esta asistencia?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/alumnos/asistencias/${id}/${idAsistencia}`
        );
       // Ordenar las asistencias por fecha en orden descendente (más reciente primero)
    const asistenciasOrdenadas = response.data.alumno.asistencias.sort((a, b) => 
      new Date(b.fecha) - new Date(a.fecha)
    );

    setAsistencias(asistenciasOrdenadas); // Actualizar la lista ordenada
      } catch (error) {
        console.error("Error al eliminar la asistencia:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Control de Asistencias</h2>

      <form onSubmit={handleAddAsistencia}>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Fecha de Asistencia:
          </label>
          <input
            type="date"
            id="fecha"
            className="form-control"
            value={nuevaAsistencia}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Agregar Asistencia
        </button>
      </form>

      <h3 className="mt-4">Listado de Asistencias</h3>
      {asistencias.length > 0 ? (
        <ul className="list-group">
          {asistencias.map((asistencia) => (
            <li key={asistencia._id} className="list-group-item d-flex justify-content-between">
            {/* Renderiza la fecha con formato amigable */}
            {moment(asistencia.fecha).format('DD/MM/YYYY')}
            <button
              onClick={() => handleDeleteAsistencia(asistencia._id)}
              className="btn btn-danger btn-sm"
            >
              Eliminar
            </button>
          </li>
          ))}
        </ul>
      ) : (
        <p>No hay asistencias registradas.</p>
      )}
    </div>
  );
};

export default ControlAsistencias;
