import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListaAlumnos from './pages/ListaAlumnos';
import AgregarAlumno from './pages/AgregarAlumno';
import EditarAlumno from './pages/EditarAlumno';
import HistorialPagos from './pages/HistorialPagos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alumnos" element={<ListaAlumnos />} />
        <Route path="/agregar-alumno" element={<AgregarAlumno />} />
        <Route path="/lista-alumnos" element={<ListaAlumnos />} />
        <Route path="/editar-alumno/:id" element={<EditarAlumno />} />
        <Route path="/historial-pagos/:id" element={<HistorialPagos />} />
      </Routes>
    </Router>
  );
};

export default App;