import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

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
        {!user ? (
          <div className="auth-buttons">
            <Link to="/login" className="auth-btn login-btn">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="auth-btn register-btn">
              Registrarse
            </Link>
          </div>
        ) : (
          <div className="user-info">
            <img 
              src={user.profilePicture} 
              alt={user.username}
              className="user-avatar"
            />
            <span className="user-name">{user.username}</span>
          </div>
        )}
        <div className="three-dots-wrapper">
          <div className="three-dots" onClick={toggleDropdown}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <g>
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </g>
            </svg>
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {user && (
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              )}
              <Link to="/about" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                Acerca de nosotros
              </Link>
              <Link to="/terms" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                Términos y Condiciones
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;