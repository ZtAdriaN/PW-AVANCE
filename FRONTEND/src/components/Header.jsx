import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SearchBar from "./SearchBar";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          VeVo
        </Link>

        <nav className="nav-menu">
          <Link to="/" className="nav-item">
            Siguiendo
          </Link>
          <Link to="/categorias" className="nav-item">
            Categorías
          </Link>
          {/* Corregimos a /coins para coincidir con tu Route */}
          <Link to="/coins" className="nav-item">
            Comprar 💎
          </Link>

          {/* Solo visible para streamers */}
          {user?.role === "streamer" && (
            <>
              <Link to="/mi-tienda" className="nav-item">
                Mi tienda
              </Link>
              <Link to="/config-niveles" className="nav-item">
                Configurar niveles
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Barra de búsqueda como componente separado */}
      <SearchBar />

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
              <span className="gems-count">
                {user.gems?.toLocaleString() || 0}
              </span>
            </div>
            <img
              src={user.profilePicture ? `http://localhost:3000${user.profilePicture}` : '/src/assets/default-avatar.svg'}
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
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </g>
            </svg>
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {user && (
                <>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {/* Accesos rápidos solo para streamer en el menú */}
                  {user.role === "streamer" && (
                    <>
                      <Link
                        to="/mi-tienda"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Mi tienda
                      </Link>
                      <Link
                        to="/config-niveles"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Configurar niveles
                      </Link>
                    </>
                  )}

                  <button
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}

              <Link
                to="/about"
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                Acerca de nosotros
              </Link>
              <Link
                to="/terms"
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
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
