import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">VeVo</Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-item">Siguiendo</Link>
          <Link to="/" className="nav-item">Categorías</Link>
        </nav>
      </div>
      <div className="header-right" ref={dropdownRef}>
        <div className="three-dots" onClick={toggleDropdown}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <g>
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </g>
          </svg>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/about" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
              Acerca de nosotros
            </Link>
            <Link to="/terms" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
              Términos y Condiciones
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;