import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarAlumno = () => {
  const { id } = useParams(); // ID del alumno a editar
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(true);

  // Obtener datos del alumno al cargar la vista
  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/alumnos/${id}`);
        setAlumno(response.data); // Prellenar los datos
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el alumno:", error);
        setLoading(false);
      }
    };

    fetchAlumno();
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno({ ...alumno, [name]: value });
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/alumnos/${id}`, alumno);
      alert("Alumno actualizado con éxito");
      navigate("/alumnos"); // Redirigir a la lista de alumnos
    } catch (error) {
      console.error("Error al actualizar el alumno:", error);
    }
  };

  if (loading) return <p>Cargando datos del alumno...</p>;

  return (
    <div className="container mt-4">
      <h1>Editar Alumno</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={alumno.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={alumno.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={alumno.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="number"
            className="form-control"
            id="telefono"
            name="telefono"
            value={alumno.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate("/alumnos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarAlumno;
