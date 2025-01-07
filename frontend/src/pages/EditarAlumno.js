import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const EditarAlumno = () => {
  const { id } = useParams(); // Para obtener el ID del alumno desde la URL
  const navigate = useNavigate(); // Para redirigir después de editar
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Cargar datos del alumno al cargar la página
    const obtenerAlumno = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:5000/api/alumnos/${id}`);
        const { nombre, apellido, contacto } = respuesta.data;
        setNombre(nombre);
        setApellido(apellido);
        setContacto(contacto);
      } catch (error) {
        setMensaje("Error al cargar los datos del alumno");
      }
    };

    obtenerAlumno();
  }, [id]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/alumnos/${id}`, {
        nombre,
        apellido,
        contacto,
      });
      setMensaje("Alumno actualizado correctamente");
      navigate("/lista-alumnos"); // Redirigir al Dashboard o lista de alumnos
    } catch (error) {
      setMensaje("Error al actualizar el alumno");
    }
  };

  return (
    <div className="container">
      <h2>Editar Alumno</h2>
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
          Cancelar
        </Link>
       
      </div>
    </div>
  );
};

export default EditarAlumno;
