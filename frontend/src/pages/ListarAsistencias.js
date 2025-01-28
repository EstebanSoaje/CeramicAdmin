import React, { useState, useEffect } from "react";
import axios from "axios";
import EditarAsistencia from "./EditarAsistencia";
import { useNavigate } from "react-router-dom";

const ListarAsistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // Hook para redirigir
  
  // Obtener asistencias al cargar el componente
  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/asistencia"
        );
        setAsistencias(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener asistencias:", error);
        setMensaje("Error al cargar las asistencias.");
        setLoading(false);
      }
    };

    //recupera alumnos
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alumnos");
        setAlumnos(response.data);
      } catch (error) {
        console.error("Error al obtener alumnos:", error);
      }
    };

    fetchAsistencias();
    fetchAlumnos();
  }, []);

  // Filtros por alumno y fecha
  const filtrarAsistencias = async () => {
    try {
      const params = {};
      if (alumnoSeleccionado) params.alumno = alumnoSeleccionado;
      if (fechaInicio) params.fechaInicio = fechaInicio;
      if (fechaFin) params.fechaFin = fechaFin;

      const response = await axios.get("http://localhost:5000/api/asistencia", {
        params,
      });
      setAsistencias(response.data);
    } catch (error) {
      console.error("Error al filtrar asistencias:", error);
      setMensaje("No se pudo aplicar el filtro.");
    }
  };

  const formatearFechaUTC = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getUTCDate().toString().padStart(2, "0"); // Día en UTC
    const mes = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Mes en UTC (0 indexado)
    const anio = date.getUTCFullYear(); // Año en UTC
    return `${dia}/${mes}/${anio}`;
  };

  //borrar asistencia
  const handleDelete = async (idAsistencia) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar esta asistencia?")
    ) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/asistencia/editar/${idAsistencia}`
      );
      setMensaje("Asistencia eliminada correctamente.");
      setAsistencias(
        asistencias.filter((asistencia) => asistencia._id !== idAsistencia)
      );
    } catch (error) {
      console.error("Error al eliminar asistencia:", error);
      setMensaje("Ocurrió un error al intentar eliminar la asistencia.");
    }
  };

  if (loading) return <p>Cargando asistencias...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Asistencias</h1>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {/* Filtros */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="alumno" className="form-label">
              Filtrar por Alumno
            </label>
            <select
              id="alumno"
              className="form-select"
              value={alumnoSeleccionado}
              onChange={(e) => setAlumnoSeleccionado(e.target.value)}
            >
              <option value="">Todos</option>
              {alumnos.map((alumno) => (
                <option key={alumno._id} value={alumno._id}>
                  {alumno.nombre} {alumno.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="fechaInicio" className="form-label">
              Fecha Desde
            </label>
            <input
              type="date"
              id="fechaInicio"
              className="form-control"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="fechaFin" className="form-label">
              Fecha Hasta
            </label>
            <input
              type="date"
              id="fechaFin"
              className="form-control"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-primary w-100"
              onClick={filtrarAsistencias}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de asistencias */}
      {asistencias.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Fecha</th>
              <th>Moldes</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.map(
              (asistencia) => (
                (
                  <tr key={asistencia._id}>
                    <td>
                      {asistencia.alumno.nombre} {asistencia.alumno.apellido}
                    </td>
                    <td>{formatearFechaUTC(asistencia.fecha)}</td>
                    <td>{asistencia.molde}</td>
                    <td>{asistencia.observaciones || "Sin observaciones"}</td>
                    <td>
                    <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/asistencia/editar/${asistencia._id}`)}
                >
                  Editar
                </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(asistencia._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>No hay asistencias registradas.</p>
      )}
    </div>
  );
};

export default ListarAsistencias;
