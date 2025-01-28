import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListarAlumnos from './pages/ListarAlumnos';
import CrearAlumno from './pages/CrearAlumno';
import EditarAlumno from './pages/EditarAlumno';
import HistorialPagos from './pages/HistorialPagos';
import Navbar from './component/navbar';
import VerAlumno from "./pages/VerAlumno";
import ListarAsistencias from './pages/ListarAsistencias';
import EditarAsistencia from './pages/EditarAsistencia';

const App = () => {
  return (
    <Router>
            <Navbar /> {/* Barra de navegación siempre visible */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alumnos" element={<ListarAlumnos />} />
        <Route path="/alumnos/:id" element={<VerAlumno />} />
        <Route path="/alumno/crear" element={<CrearAlumno />} />
        <Route path="/alumno/editar/:id" element={<EditarAlumno />} />
        <Route path="/historial-pagos/:id" element={<HistorialPagos />} />
        <Route path="/asistencia/editar/:id" element={<EditarAsistencia />} />
        <Route path="/asistencias" element={<ListarAsistencias />} />

      </Routes>
    </Router>
  );
};

export default App;
