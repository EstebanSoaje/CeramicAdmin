import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

const Navbar = () => {
  useEffect(() => {
    // Inicializar componentes de Materialize
    M.AutoInit();
  }, []);

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">CeramicAdmin</a>
          <a href="/" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/alumnos">Alumnos</a></li>
            <li><a href="/planes">Planes</a></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/alumnos">Alumnos</a></li>
        <li><a href="/planes">Planes</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
