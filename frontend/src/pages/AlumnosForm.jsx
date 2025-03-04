import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AlumnoForm = () => {
  const { id } = useParams(); // ID del alumno a editar
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    plan: ""
  });
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(true);
  const [nombreForm, setNombreForm] = useState("");

  // Obtener datos del alumno al cargar la vista si estamos en la url de edición

  useEffect(() => {
    if (window.location.pathname !== `/alumnos/crear`) {
      const fetchAlumno = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/alumnos/${id}`
          );
          setAlumno(response.data); // Prellenar los datos
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener el alumno:", error);
          setLoading(false);
        }
      };
      fetchAlumno();
    } else {
      setNombreForm("Crear Alumno");
      setEditable(true);
      setLoading(false);
      return;
    }

    //caracteristicas del formulario segun la url
    if (window.location.pathname === `/alumnos/ver/${id}`) {
      setEditable(false);
      setNombreForm("Ver Alumno");
    } else if (window.location.pathname === `/alumnos/editar/${id}`) {
      setEditable(true);
      setNombreForm("Editar Alumno");
    } else if (window.location.pathname === `/alumnos/crear`) {
      setEditable(true);
      setNombreForm("Crear Alumno");
    }
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno({ ...alumno, [name]: value });
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.location.pathname === `/alumnos/editar/${id}`) {
      try {
        await axios.put(`http://localhost:5000/api/alumnos/${id}`, alumno);
        alert("Alumno actualizado con éxito");
        navigate("/alumnos"); // Redirigir a la lista de alumnos
      } catch (error) {
        console.error("Error al actualizar el alumno:", error);
      }
    } else if (window.location.pathname === `/alumnos/crear`) {
      try {
        await axios.post(`http://localhost:5000/api/alumnos/crear`, alumno);
        alert("Alumno creado con éxito");
        navigate("/alumnos"); // Redirigir a la lista de alumnos
      } catch (error) {
        console.error("Error al crear el alumno:", error);
      }
    }
  };

  //botones a mostrar segun la url
  const accionesform = () => {
    if (window.location.pathname !== `/alumnos/ver/${id}`) {
      return (
        <>
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
        </>
      );
    } else if (window.location.pathname === `/alumnos/ver/${id}`) {
      return (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/alumnos")}
        >
          Volver
        </button>
      );
    } else if (window.location.pathname === `/alumnos/crear`) {
      return (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/alumnos")}
        >
          Volver
        </button>
      );
    }
  };

  if (loading) return <p>Cargando administrador de alumno...</p>;

  return (
    <div className="container mt-4">
      <h1>{nombreForm}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            disabled={!editable}
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
            disabled={!editable}
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
            disabled={!editable}
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
            disabled={!editable}
            type="number"
            className="form-control"
            id="telefono"
            name="telefono"
            value={alumno.telefono}
            onChange={handleChange}
            required
          />
        </div>
        {accionesform(alumno)}
      </form>
    </div>
  );
};

export default AlumnoForm;
