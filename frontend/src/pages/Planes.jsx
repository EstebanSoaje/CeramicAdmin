import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListaPlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    // Cargar la lista de Planes desde el backend
    axios
      .get("http://localhost:5000/api/planes")
      .then((response) => {
        setPlanes(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los planes:", error);
      });
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const accionesPlanes = (plan) => {
    if (window.location.pathname === "/planes") {
      return (
        <td>
          <Link to={`/planes/ver/${plan._id}`} className="btn">
            Ver Detalles
          </Link>
          <Link to={`/planes/editar/${plan._id}`} className="btn">
            Editar
          </Link>
          <button
            onClick={() => handleEliminar(plan._id)}
            className="btn"
          >
            Eliminar
          </button>
        </td>
      );
    } else {
      return <td>💰🔴☝️🟢</td>;
    }
  };

  const planesFiltrados = planes.filter((plan) =>
    plan.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // Manejo de la eliminación de planes
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este plan?")) {
      try {
        await axios.delete(`http://localhost:5000/api/planes/${id}`);
        setPlanes(planes.filter((plan) => plan._id !== id));
      } catch (error) {
        console.error("Error al eliminar el plan:", error);
      }
    }
  };

  return (
    <>
    <h3>Planes</h3>
      <input
        type="text"
        placeholder="Buscar plan por nombre"
        value={filtro}
        onChange={handleFiltroChange}
      />

        <table className="striped centered" >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Moldes</th>
              <th>Clases</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody> 
            {planesFiltrados.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.nombre}</td>
              <td>{plan.moldes}</td>
              <td>{plan.clases}</td>
              <td>{plan.precio}</td>

              {accionesPlanes(plan)}
            </tr>
            ))}
            </tbody>
        </table>
        <Link to={`/planes/crear`} className="btn">
            Crear Plan
          </Link>
    </>
  );
};

export default ListaPlanes;
