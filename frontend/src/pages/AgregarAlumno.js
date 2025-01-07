import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AgregarAlumno = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/alumnos/crear", {
        nombre,
        apellido,
        contacto,
      });
      
      setMensaje("Alumno agregado correctamente");
      // Limpiar formulario
      setNombre("");
      setApellido("");
      setContacto("");
    } catch (error) {
      setMensaje("Error al agregar alumno. Inténtalo nuevamente.");
    }
  };
return (
    <div className="container">
      <h2>Agregar Alumno</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={manejarSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contacto</label>
          <input
            type="text"
            className="form-control"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
      <div className="mt-4">
        <Link to="/lista-alumnos" className="btn btn-secondary mr-2">
          Lista de alumnos
        </Link>
       
      </div>
    </div>
  );
};

export default AgregarAlumno;
