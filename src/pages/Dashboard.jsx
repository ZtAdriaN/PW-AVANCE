import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="main-content">
        <div className="content">
          <div className="page-content">
            <h1 className="page-title">Dashboard</h1>
            <p>Debes iniciar sesión para ver tu dashboard.</p>
            <Link to="/login" className="back-button">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const averageStreamDuration =
    user.totalStreams > 0
      ? (user.streamingHours / user.totalStreams).toFixed(1)
      : 0;

  return (
    <div className="main-content">
      <div className="content">
        <div className="page-content">
          <h1 className="page-title">Dashboard</h1>

          <div className="dashboard-container">
            <div className="dashboard-header">
              <div className="user-summary">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="dashboard-avatar"
                />
                <div>
                  <h2>¡Hola, {user.username}!</h2>
                  <p>
                    {user.role === "streamer"
                      ? "Aquí tienes un resumen de tu actividad de streaming"
                      : "Aquí tienes un resumen de tu actividad en la plataforma"}
                  </p>
                  <span className="user-role-badge">
                    {user.role === "streamer" ? "🎥 Streamer" : "👤 Usuario"}
                  </span>
                </div>
              </div>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card primary">
                <div className="stat-icon">⏰</div>
                <div className="stat-content">
                  <div className="stat-number">{user.streamingHours}</div>
                  <div className="stat-title">Horas Totales</div>
                  <div className="stat-subtitle">de transmisión</div>
                </div>
              </div>

              <div className="stat-card secondary">
                <div className="stat-icon">📺</div>
                <div className="stat-content">
                  <div className="stat-number">{user.totalStreams}</div>
                  <div className="stat-title">Streams</div>
                  <div className="stat-subtitle">realizados</div>
                </div>
              </div>

              <div className="stat-card tertiary">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-number">{averageStreamDuration}h</div>
                  <div className="stat-title">Promedio</div>
                  <div className="stat-subtitle">por stream</div>
                </div>
              </div>

              <div className="stat-card quaternary">
                <div className="stat-icon">💎</div>
                <div className="stat-content">
                  <div className="stat-number">
                    {user.gems.toLocaleString()}
                  </div>
                  <div className="stat-title">Gemas</div>
                  <div className="stat-subtitle">disponibles</div>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <h3>Progreso del Mes</h3>
              <div className="progress-summary">
                <div className="progress-item">
                  <span className="progress-label">
                    Meta de horas mensuales:
                  </span>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <span className="progress-percentage">60%</span>
                  </div>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Streams este mes:</span>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <span className="progress-percentage">40%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <h3>Acciones Rápidas</h3>
              <div className="quick-actions">
                {user.role === "streamer" ? (
                  <>
                    <button className="action-button primary">
                      <span className="action-icon">🎥</span>
                      Iniciar Stream
                    </button>
                    <button className="action-button secondary">
                      <span className="action-icon">⚙️</span>
                      Configurar Stream
                    </button>
                    <button className="action-button quaternary">
                      <span className="action-icon">📊</span>
                      Estadísticas Avanzadas
                    </button>
                    <Link to="/mi-tienda" className="action-button">
                      <span className="action-icon">🛒</span>
                      Mi Tienda
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/" className="action-button primary">
                      <span className="action-icon">🏠</span>
                      Ver Streams
                    </Link>
                    <button className="action-button secondary">
                      <span className="action-icon">💎</span>
                      Comprar Gemas
                    </button>
                  </>
                )}
                <Link to="/profile" className="action-button tertiary">
                  <span className="action-icon">👤</span>
                  Ver Perfil
                </Link>
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

export default Dashboard;
