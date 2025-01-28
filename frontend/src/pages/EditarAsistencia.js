import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarAsistencia = () => {
  const { id } = useParams(); // Obtener el ID desde la URL
  const navigate = useNavigate(); // Hook para redirigir
  const [asistencia, setAsistencia] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Obtener la asistencia a editar al cargar el componente
  useEffect(() => {
    const fetchAsistencia = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/asistencia/${id}`);
        setAsistencia(response.data);
      } catch (error) {
        console.error("Error al obtener la asistencia:", error);
        setMensaje("Error al cargar la asistencia.");
      }
    };

    fetchAsistencia();
  }, [id]);

  const handleChange = (e) => {
    setAsistencia({
      ...asistencia,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/asistencia/${id}`, asistencia);
      setMensaje("Asistencia actualizada correctamente.");
      navigate("/asistencias"); // Redirigir al listado
    } catch (error) {
      console.error("Error al actualizar la asistencia:", error);
      setMensaje("Error al actualizar la asistencia.");
    }
  };

  if (!asistencia) return <p>Cargando asistencia...</p>;

  return (
    <div className="container mt-4">
      <h1>Editar Asistencia</h1>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            className="form-control"
            value={new Date(asistencia.fecha).toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="molde" className="form-label">Molde</label>
          <input
            type="number"
            id="molde"
            name="molde"
            className="form-control"
            value={asistencia.molde}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="observaciones" className="form-label">Observaciones</label>
          <textarea
            id="observaciones"
            name="observaciones"
            className="form-control"
            value={asistencia.observaciones || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarAsistencia;
