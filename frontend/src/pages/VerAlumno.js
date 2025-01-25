import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerAlumno = () => {
  const { id } = useParams(); // Obtiene el ID del alumno desde la URL
  const [alumno, setAlumno] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/alumnos/${id}`);
        setAlumno(response.data); // Asegúrate de que el backend envíe un objeto `alumno`
        console.log(alumno);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del alumno:", error);
        setLoading(false);
      }
    };

    fetchAlumno();
  }, [alumno, id]);

  if (loading) return <p>Cargando datos del alumno...</p>;

  if (!alumno) return <p>No se encontró información sobre este alumno.</p>;

  return (
    <div className="container mt-4">
      <h1>Detalles del Alumno</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{`${alumno.nombre} ${alumno.apellido}`}</h5>
          <p><strong>Email:</strong> {alumno.email}</p>
          <p><strong>Teléfono:</strong> {alumno.telefono}</p>
          <p><strong>Fecha de Registro:</strong> {new Date(alumno.fechaRegistro).toLocaleDateString()}</p>
          <p><strong>Número de Asistencias:</strong> {alumno.asistencias?.length || 0}</p>
          <p><strong>Total de Pagos:</strong> {alumno.pagos?.length || 0}</p>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/alumnos" className="btn btn-secondary me-2">Volver</Link>
        <Link to={`/alumno/editar/${id}`} className="btn btn-primary">Editar Alumno</Link>
      </div>
    </div>
  );
};

export default VerAlumno;
