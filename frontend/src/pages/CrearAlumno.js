import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CrearAlumno = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  const [error, setError] = useState("");

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/alumnos/crear", formulario);
      navigate("/alumnos"); // Redirigir a la lista de alumnos después de crear
    } catch (err) {
      console.error("Error al crear el alumno:", err);
      setError("Hubo un problema al crear el alumno. Intenta nuevamente.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Crear Alumno</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="form-control"
            value={formulario.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formulario.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono:
          </label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            className="form-control"
            value={formulario.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Alumno
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

export default CrearAlumno;
