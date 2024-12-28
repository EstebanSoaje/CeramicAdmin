import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Agregar Alumno</h2>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contacto:</label>
          <input
            type="text"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Alumno</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AgregarAlumno;
