import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PlanesForm = () => {
  const { id } = useParams(); // ID del plan a editar
  const navigate = useNavigate();
  const [plan, setPlan] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    moldes: 1,
    clases: 4,
  });
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(true);
  const [nombreForm, setNombreForm] = useState("");

  // Obtener datos del plan al cargar la vista si estamos en la url de edición

  useEffect(() => {
    if (window.location.pathname !== `/planes/crear`) {
      const fetchPlan = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/planes/${id}`
          );
          setPlan(response.data); // Prellenar los datos
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener el plan:", error);
          setLoading(false);
        }
      };
      fetchPlan();
    } else {
      setNombreForm("Crear Plan");
      setEditable(true);
      setLoading(false);
      return;
    }

    //caracteristicas del formulario segun la url
    if (window.location.pathname === `/planes/ver/${id}`) {
      setEditable(false);
      setNombreForm("Ver Plan");
    } else if (window.location.pathname === `/planes/editar/${id}`) {
      setEditable(true);
      setNombreForm("Editar Plan");
    } else if (window.location.pathname === `/planes/crear`) {
      setEditable(true);
      setNombreForm("Crear Plan");
    }
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.location.pathname === `/planes/editar/${id}`) {
      try {
        await axios.put(`http://localhost:5000/api/planes/${id}`, plan);
        alert("Plan actualizado con éxito");
        navigate("/planes"); // Redirigir a la lista de planes
      } catch (error) {
        console.error("Error al actualizar el plan:", error);
      }
    } else if (window.location.pathname === `/planes/crear`) {
      try {
        await axios.post(`http://localhost:5000/api/planes/crear`, plan);
        alert("Plan creado con éxito");
        navigate("/planes"); // Redirigir a la lista de planes
      } catch (error) {
        console.error("Error al crear el plan:", error);
      }
    }
  };

  //botones a mostrar segun la url
  const accionesform = () => {
    if (window.location.pathname !== `/planes/ver/${id}`) {
      return (
        <>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-3"
            onClick={() => navigate("/planes")}
          >
            Cancelar
          </button>
        </>
      );
    } else if (window.location.pathname === `/planes/ver/${id}`) {
      return (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/planes")}
        >
          Volver
        </button>
      );
    } else if (window.location.pathname === `/planes/crear`) {
      return (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/planes")}
        >
          Volver
        </button>
      );
    }
  };

  if (loading) return <p>Cargando administrador de plan...</p>;

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
            value={plan.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripcion
          </label>
          <input
            disabled={!editable}
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={plan.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <input
            disabled={!editable}
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={plan.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="moldes" className="form-label">
            Moldes
          </label>
          <input
            disabled={!editable}
            type="number"
            className="form-control"
            id="moldes"
            name="moldes"
            value={plan.moldes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clases" className="form-label">
            Clases
          </label>
          <input
            disabled={!editable}
            type="number"
            className="form-control"
            id="clases"
            name="clases"
            value={plan.clases}
            onChange={handleChange}
            required
          />
        </div>
        {accionesform(plan)}
      </form>
    </div>
  );
};

export default PlanesForm;
