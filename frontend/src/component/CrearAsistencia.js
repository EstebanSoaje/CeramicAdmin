import React, { useState, useEffect } from "react";
import axios from "axios";

const CrearAsistencia = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState("");
  const [cantidadMoldes, setCantidadMoldes] = useState(0);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]); // Fecha actual en formato YYYY-MM-DD
  const [observaciones, setObservaciones] = useState(""); // Nuevo estado para observaciones
  const [mensaje, setMensaje] = useState("");

  // Obtener la lista de alumnos al cargar el componente
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alumnos");
        setAlumnos(response.data); // Suponiendo que el backend devuelve los alumnos en `alumnos`
      } catch (error) {
        console.error("Error al obtener los alumnos:", error);
      }
    };

    fetchAlumnos();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alumnoSeleccionado) {
      setMensaje("Por favor, selecciona un alumno.");
      return;
    }

    const nuevaAsistencia = {
      fecha,
      molde: cantidadMoldes,
      observaciones, // Enviar también las observaciones
    };

    try {
      await axios.post(`http://localhost:5000/api/asistencia/${alumnoSeleccionado}`, nuevaAsistencia);
      setMensaje("Asistencia registrada correctamente.");
      // Resetear campos
      setAlumnoSeleccionado("");
      setCantidadMoldes(0);
      setFecha(new Date().toISOString().split("T")[0]);
      setObservaciones(""); // Resetear observaciones
    } catch (error) {
      console.error("Error al registrar la asistencia:", error);
      setMensaje("Ocurrió un error al registrar la asistencia.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Registrar Asistencia</h1>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="alumno" className="form-label">
            Seleccionar Alumno
          </label>
          <select
            id="alumno"
            className="form-select"
            value={alumnoSeleccionado}
            onChange={(e) => setAlumnoSeleccionado(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {alumnos.map((alumno) => (
              <option key={alumno._id} value={alumno._id}>
                {alumno.nombre} {alumno.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cantidadMoldes" className="form-label">
            Cantidad de Moldes
          </label>
          <input
            type="number"
            id="cantidadMoldes"
            className="form-control"
            value={cantidadMoldes}
            onChange={(e) => setCantidadMoldes(Number(e.target.value))}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="observaciones" className="form-label">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            className="form-control"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Agrega cualquier observación adicional (opcional)"
            maxLength={500}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Asistencia
        </button>
      </form>
    </div>
  );
};

export default CrearAsistencia;
