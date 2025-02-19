// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Nabvar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alumnos from './pages/Alumnos.jsx';
import AlumnosForm from './pages/AlumnosForm.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/alumnos" element={<Alumnos />} />
      <Route path="/alumnos/crear" element={<AlumnosForm />} />
      <Route path="/alumnos/ver/:id" element={<AlumnosForm />} />
      <Route path="/alumnos/editar/:id" element={<AlumnosForm />} />

        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
