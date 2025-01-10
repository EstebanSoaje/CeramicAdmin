import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ListaAlumnos = () => {
  const [alumnos, setAlumnos] = React.useState([]);

  React.useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alumnos');
        setAlumnos(response.data);
      } catch (error) {
        console.error('Error fetching alumnos:', error);
      }
    };

    fetchAlumnos();
  }, []);

    // Manejo de la eliminación de alumnos
    const handleEliminar = async (id) => {
      if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
        try {
          await axios.delete(`http://localhost:5000/api/alumnos/${id}`);
          setAlumnos(alumnos.filter(alumno => alumno._id !== id));
        } catch (error) {
          console.error('Error al eliminar el alumno:', error);
        }
      }
    };
    // Inicializar navigate
    const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1>Lista de Alumnos</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Contacto</th>
            <th>Fecha de Registro</th>
            <th>Estado de Pagos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map(alumno => (
            <tr key={alumno._id}>
              <td>{`${alumno.nombre} ${alumno.apellido}`}</td>
              <td>{alumno.contacto}</td>
              <td>{new Date(alumno.fechaRegistro).toLocaleDateString()}</td>
              <td>
                {alumno.pagos.some(pago => !pago.pagado)
                  ? 'Pendiente'
                  : 'Pagado'}
              </td>
              <td>
                <Link to={`/editar-alumno/${alumno._id}`} className="btn btn-warning btn-sm mr-2">
                  Editar
                </Link>
                <Link to={`/asistencias/${alumno._id}`} className="btn btn-info btn-sm">
                  Ver Asistencias
                </Link>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/historial-pagos/${alumno._id}`)}
                >
                  Ver Historial
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminar(alumno._id)}
                >
                  Eliminar
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Link to="/agregar-alumno" className="btn btn-primary mr-2">
          Agregar Alumno
        </Link>
        <Link to="/" className="btn btn-secondary">
          Ir al Dashboard
        </Link>
      </div>
    </div>
  );
  
};

export default ListaAlumnos;

