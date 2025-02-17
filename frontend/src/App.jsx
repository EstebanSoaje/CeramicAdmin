// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Nabvar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alumnos from './pages/Alumnos.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alumnos" element={<Alumnos />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
