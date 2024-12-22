import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    totalAlumnos: 0,
    pagosPendientes: 0,
    pagosRealizados: 0,
  });

  React.useEffect(() => {
    // Hacer una solicitud al backend para obtener estadísticas
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alumnos');
        const alumnos = response.data;
        const pagosPendientes = alumnos.filter(alumno =>
          alumno.pagos.some(pago => !pago.pagado)
        ).length;
        const pagosRealizados = alumnos.filter(alumno =>
          alumno.pagos.every(pago => pago.pagado)
        ).length;

        setStats({
          totalAlumnos: alumnos.length,
          pagosPendientes,
          pagosRealizados,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total de Alumnos</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalAlumnos}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Pagos Pendientes</div>
            <div className="card-body">
              <h5 className="card-title">{stats.pagosPendientes}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Alumnos al Día</div>
            <div className="card-body">
              <h5 className="card-title">{stats.pagosRealizados}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/agregar-alumno" className="btn btn-primary mr-2">
          Agregar Alumno
        </Link>
        <Link to="/lista-alumnos" className="btn btn-secondary">
          Ver Lista de Alumnos
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
