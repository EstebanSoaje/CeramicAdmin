import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListaAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    // Cargar la lista de alumnos desde el backend
    axios
      .get("http://localhost:5000/api/alumnos")
      .then((response) => {
        setAlumnos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los alumnos:", error);
      });
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const accionesAlumnos = (alumno) => {
    if (window.location.pathname === "/alumnos") {
      return (
        <td>
          <Link to={`/alumnos/ver/${alumno._id}`} className="btn">
            Ver Detalles
          </Link>
          <Link to={`/alumnos/editar/${alumno._id}`} className="btn">
            Editar
          </Link>
          <button onClick={() => handleEliminar(alumno._id)} className="btn">
            Eliminar
          </button>
        </td>
      );
    } else {
      return <td>{indicadores(alumno)}</td>;
    }
  };

  const indicadores = (alumno) => {
    try {
      return handleIndicadorPago(alumno), handleIndicadorAsistencia(alumno);
    } catch (error) {
      console.log("Error al cargar los indicadores", error);
      return (
        <td>
          <img
            src="src/assets/dinero.png"
            alt=""
            className="circle"
            width={50}
          ></img>
          <img
            src="src/assets/asistencia.png"
            alt=""
            className="circle"
            width={50}
          ></img>
        </td>
      );
    }
  };

  //indicador de control de pago
  const handleIndicadorPago = (alumno) => {
    const ultimoPago = alumno.pagos[alumno.pagos.length - 1];
    const asistencias = alumno.asistencias;
    const cantAsisPlan = alumno.plan.clases;
    const cantAsis = asistencias.length;

    if (cantAsis < cantAsisPlan && ultimoPago.monto === alumno.plan.precio) {
      return (
        <img
          src="src/assets/pagoHecho.jpg"
          alt=""
          className="circle"
          width={50}
        ></img>
      );
    } else {
      return (
        <img
          src="src/assets/pagoPendiente.jpg"
          alt=""
          className="circle"
          width={50}
        ></img>
      );
    }
  };

  //indicador de control de pago
  const handleIndicadorAsistencia = (alumno) => {
    const ultimaAsistencia = alumno.asistencias[alumno.asistencias.length - 1];

    if (ultimaAsistencia.fecha === Date.now()) {
      return (
        <img
          src="src/assets/asistenciaHecha.jpg"
          alt=""
          className="circle"
          width={50}
        ></img>
      );
    } else {
      return (
        <img
          src="src/assets/asistenciaPendiente.jpg"
          alt=""
          className="circle"
          width={50}
        ></img>
      );
    }
  };

  const alumnosFiltrados = alumnos.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // Manejo de la eliminación de alumnos
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este alumno?")) {
      try {
        await axios.delete(`http://localhost:5000/api/alumnos/${id}`);
        setAlumnos(alumnos.filter((alumno) => alumno._id !== id));
      } catch (error) {
        console.error("Error al eliminar el alumno:", error);
      }
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar alumno por nombre"
        value={filtro}
        onChange={handleFiltroChange}
      />

      <table className="striped centered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnosFiltrados.map((alumno) => (
            <tr key={alumno._id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              {accionesAlumnos(alumno)}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/alumnos/crear`} className="btn">
        Crear Alumno
      </Link>
    </>
  );
};

export default ListaAlumnos;
