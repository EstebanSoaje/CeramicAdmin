import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListarAlumnos = () => {
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

    return (
      <div className="container mt-4">
        <h1 className="mb-4">Lista de Alumnos</h1>
        <Link to="/alumno/crear" className="btn btn-primary mb-3">
          Agregar Alumno
        </Link>
        {alumnos.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno._id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.email}</td>
                  <td>{alumno.telefono}</td>
                  <td>
                    <Link to={`/alumnos/${alumno._id}`} className="btn btn-info btn-sm me-2">
                      Ver Detalles
                    </Link>
                    <Link to={`/alumno/editar/${alumno._id}`} className="btn btn-warning btn-sm me-2">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(alumno._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay alumnos registrados.</p>
        )}
      </div>
    );
  };
  
  export default ListarAlumnos;