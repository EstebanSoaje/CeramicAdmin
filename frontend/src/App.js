import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListarAlumnos from './pages/ListarAlumnos';
import CrearAlumno from './pages/CrearAlumno';
import EditarAlumno from './pages/EditarAlumno';
import HistorialPagos from './pages/HistorialPagos';
import Navbar from './component/navbar';
import ControlAsistencias from './pages/ControlAsistencias';
import VerAlumno from "./pages/VerAlumno";



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
        <Route path="/asistencias/:id" element={<ControlAsistencias />} />
      </Routes>
    </Router>
  );
};

export default App;
