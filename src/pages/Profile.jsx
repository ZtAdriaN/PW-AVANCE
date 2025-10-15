import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const localStreams = user.totalStreams;
  const localHours = user.streamingHours;

  if (!user) {
    return (
      <div className="main-content">
        <div className="content">
          <div className="page-content">
            <h1 className="page-title">Perfil de Usuario</h1>
            <p>Debes iniciar sesión para ver tu perfil.</p>
            <Link to="/login" className="back-button">Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = (user.points / user.pointsToNextLevel) * 100;
  // Mostrar siempre el nivel del contexto global
  const displayLevel = user.level;

  return (
    <div className="main-content">
      <div className="content">
        <div className="page-content">
          <h1 className="page-title">Mi Perfil</h1>

          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                <img src={user.profilePicture} alt={user.username} />
              </div>
              <div className="profile-info">
                <h2>{user.username}</h2>
                <p className="profile-email">{user.email}</p>
                <div className="profile-gems">
                  <span className="gems-icon">💎</span>
                  <span className="gems-count">{user.gems.toLocaleString()}</span>
                  <span className="gems-label">Gemas</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Nivel y Progreso</h3>
              <div className="level-container">
                <div className="level-info">
                  <div className="current-level">
                    <span className="level-number">Nivel {displayLevel}</span>
                  </div>
                  <div className="level-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {user.points} / {user.pointsToNextLevel} puntos
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Estadísticas</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{localStreams}</div>
                  <div className="stat-label">Streams Realizados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{localHours}h</div>
                  <div className="stat-label">Horas Transmitidas</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{displayLevel}</div>
                  <div className="stat-label">Nivel Actual</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{user.gems.toLocaleString()}</div>
                  <div className="stat-label">Gemas Totales</div>
                </div>
              </div>
            </div>
          </div>

          <div className="back-button-container">
            <Link to="/" className="back-button">
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;