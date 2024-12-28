import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

const HistorialPagos = () => {
  const { id } = useParams(); // Obtiene el ID del alumno desde la URL
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const obtenerPagos = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:5000/api/alumnos/${id}/pagos`);
        setPagos(respuesta.data);
      } catch (error) {
        console.error("Error al obtener el historial de pagos:", error);
      }
    };
    obtenerPagos();
  }, [id]);

  //gestion de pagos
  const [nuevoPago, setNuevoPago] = useState({ mes: '', monto: 0, pagado: false, fechaPago: '' });

const handleInputChange = (e) => {
  setNuevoPago({ ...nuevoPago, [e.target.name]: e.target.value });
};

const agregarPago = async () => {
  try {
    await axios.post(`/api/alumnos/${id}/pagos`, nuevoPago);
    setPagos([...pagos, nuevoPago]); // Actualizar la tabla de pagos
  } catch (error) {
    console.error('Error al agregar el pago:', error);
  }
};


  return (
    <div className="container">
      <h2>Historial de Pagos</h2>
      {pagos.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Monto</th>
              <th>Pagado</th>
              <th>Fecha de Pago</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago, index) => (
              <tr key={index}>
                <td>{pago.mes}</td>
                <td>${pago.monto}</td>
                <td>{pago.pagado ? "Sí" : "No"}</td>
                <td>{pago.fechaPago ? new Date(pago.fechaPago).toLocaleDateString() : "Pendiente"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay pagos registrados.</p>
      )}

<form>
    <input type="text" name="mes" placeholder="Mes" onChange={handleInputChange} />
    <input type="number" name="monto" placeholder="Monto" onChange={handleInputChange} />
    <input type="checkbox" name="pagado" onChange={(e) => setNuevoPago({ ...nuevoPago, pagado: e.target.checked })} />
    <input type="date" name="fechaPago" onChange={handleInputChange} />
    <button type="button" onClick={agregarPago}>Agregar Pago</button>
  </form>

      <div className="mt-4">
        <Link to="/" className="btn btn-primary mr-2">
          Ir al Dashboard
        </Link>
        <Link to="/lista-alumnos" className="btn btn-secondary">
          Ver Lista de Alumnos
        </Link>
      </div>
    </div>
    
  );
};

export default HistorialPagos;
