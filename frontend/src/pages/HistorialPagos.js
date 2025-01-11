import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const HistorialPagos = () => {
  const { id } = useParams(); // ID del alumno
  const [pagos, setPagos] = useState([]);
  const [nuevoPago, setNuevoPago] = useState({
    mes: '',
    monto: '',
    pagado: true,
    fechaPago: '',
  });

  const [pagoEditado, setPagoEditado] = useState(null); // Pago en edición

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/alumnos/${id}`);
        setPagos(response.data.pagos);
      } catch (error) {
        console.error('Error al cargar el historial de pagos:', error);
      }
    };

    fetchPagos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (pagoEditado) {
      setPagoEditado({ ...pagoEditado, [name]: value });
    } else {
      setNuevoPago({ ...nuevoPago, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/alumnos/agregar-pago/${id}`, nuevoPago);
      setPagos(response.data.alumno.pagos);
      setNuevoPago({ mes: '', monto: '', pagado: true, fechaPago: '' });
    } catch (error) {
      console.error('Error al agregar el pago:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/alumnos/editar-pago/${id}/${pagoEditado._id}`, pagoEditado);
      setPagos(response.data.alumno.pagos);
      setPagoEditado(null);
    } catch (error) {
      console.error('Error al editar el pago:', error);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm('¿Estás seguro de eliminar este pago?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/alumnos/eliminar-pago/${id}/${_id}`);
        setPagos(response.data.alumno.pagos);
      } catch (error) {
        console.error('Error al eliminar el pago:', error);
      }
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago, index) => (
              <tr key={index}>
                <td>{pago.mes}</td>
                <td>${pago.monto}</td>
                <td>{pago.pagado ? "Sí" : "No"}</td>
                <td>{pago.fechaPago ? new Date(pago.fechaPago).toLocaleDateString() : "Pendiente"}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => setPagoEditado(pago)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(pago._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay pagos registrados.</p>
      )}

      {pagoEditado ? (
        <div>
          <h2>Editar Pago</h2>
          <form onSubmit={handleEdit}>
            <div>
              <label>Mes:</label>
              <input
                type="text"
                name="mes"
                value={pagoEditado.mes}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Monto:</label>
              <input
                type="number"
                name="monto"
                value={pagoEditado.monto}
                onChange={handleChange}
                required
              />
            </div>

            <div class="form-check form-switch">
              <label class="form-check-label" for="flexSwitchCheckChecked">Pagado:</label>
              
              <input
                class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                name="pagado"
                checked={pagoEditado.pagado}
                onChange={(e) => setPagoEditado({ ...pagoEditado, pagado: e.target.checked })}
              />
            </div>
            <div>
              <label>Fecha de Pago:</label>
              <input
                type="date"
                name="fechaPago"
                value={pagoEditado.fechaPago}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Guardar Cambios</button>
            <button className="btn btn-secondary" onClick={() => setPagoEditado(null)}>Cancelar</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Agregar Pago</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label  className="form-label">Mes:</label>
              <input
                type="text"
                className="form-control"
                name="mes"
                value={nuevoPago.mes}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Monto:</label>
              <input
                type="number"
                className="form-control"
                name="monto"
                value={nuevoPago.monto}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pagado:</label>
              <input
                type="checkbox"
                name="pagado"
                checked={nuevoPago.pagado}
                onChange={(e) => setNuevoPago({ ...nuevoPago, pagado: e.target.checked })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de Pago:</label>
              <input
                type="date"
                className="form-control"
                name="fechaPago"
                value={nuevoPago.fechaPago}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Agregar Pago</button>
          </form>
        </div>
      )}
      <div className="mt-4">
              <Link to="/lista-alumnos" className="btn btn-primary mr-2">
                Lista de Alumno
              </Link>
              <Link to="/" className="btn btn-secondary">
                Ir al Dashboard
              </Link>
            </div>
    </div>
  );
};

export default HistorialPagos;
