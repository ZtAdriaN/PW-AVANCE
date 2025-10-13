import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// Imágenes de ejemplo, ajusta las rutas según tu estructura
const categoriasData = [
  { img: '/images/valorant.png', titulo: 'VALORANT', espectadores: '28.978 espectadores' },
  { img: '/images/charlando.jpg', titulo: 'Charlando', espectadores: '306.858 espectadores' },
  { img: '/images/lol.png', titulo: 'League of Legends', espectadores: '68.932 espectadores' },
  // ...agrega más categorías aquí
];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
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
          <Link to="/categorias" className="nav-item">Categorías</Link>
          <Link to="/Coins" className='nav-item'>Comprar 💎</Link>
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
            <div className="user-gems">
              <span className="gems-icon">💎</span>
              <span className="gems-count">{user.gems?.toLocaleString() || 0}</span>
            </div>
            {user?.role==="user"&&(
              <Link to="/RegalosSubs" className="nav-item">
                Regalos para Seguidores
              </Link>
            )}
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
                <>
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    Mi Perfil
                  </Link>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    Dashboard
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </>
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