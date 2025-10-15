import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StreamConfigModal from "../components/StreamConfigModal";

const Dashboard = () => {
  const { user } = useAuth();
  // Leer streams y horas desde localStorage si existen
  const [localStreams, setLocalStreams] = React.useState(null);
  const [localHours, setLocalHours] = React.useState(null);
  const [refreshKey, setRefreshKey] = React.useState(0);

  React.useEffect(() => {
    if (user?.id) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setLocalStreams(currentUser.totalStreams ?? user.totalStreams);
        setLocalHours(currentUser.streamingHours ?? user.streamingHours);
      } else {
        setLocalStreams(user.totalStreams);
        setLocalHours(user.streamingHours);
      }
    }
  }, [user?.id, refreshKey]);

  // Verificar actualizaciones en localStorage cada segundo
  React.useEffect(() => {
    const checkForUpdates = () => {
      if (user?.id) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.id === user.id) {
          // Si hay nuevos datos en localStorage, actualizar el estado
          if (currentUser.totalStreams !== localStreams || 
              currentUser.streamingHours !== localHours) {
            setRefreshKey(prev => prev + 1);
          }
        }
      }
    };

    const interval = setInterval(checkForUpdates, 1000); // Verificar cada segundo
    return () => clearInterval(interval);
  }, [user?.id, localStreams, localHours]);
  const navigate = useNavigate();
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [streamConfig, setStreamConfig] = useState(() => {
    // Cargar configuración guardada al inicializar
    const savedConfig = localStorage.getItem('streamConfig');
    return savedConfig ? JSON.parse(savedConfig) : null;
  });

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

  if (user.role !== 'streamer') {
    return (
      <div className="main-content">
        <div className="content">
          <div className="page-content">
            <h1 className="page-title">Dashboard</h1>
            <p>Solo los streamers pueden acceder al dashboard.</p><br />
            <Link to="/" className="back-button">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Obtener los datos más actualizados (localStorage puede tener datos más recientes)
  const getCurrentUserData = () => {
    try {
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const found = users.find(u => u.id === user.id);
      if (found) {
        return {
          totalStreams: found.totalStreams || 0,
          streamingHours: found.streamingHours || 0
        };
      }
      // Fallback a currentUser si no está en registeredUsers
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.id === user.id) {
        return {
          totalStreams: currentUser.totalStreams || 0,
          streamingHours: currentUser.streamingHours || 0
        };
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
    return {
      totalStreams: user.totalStreams || 0,
      streamingHours: user.streamingHours || 0
    };
  };

  const currentData = getCurrentUserData();
  const totalStreams = currentData.totalStreams;
  const streamingHours = currentData.streamingHours;
  const averageStreamDuration = totalStreams > 0 ? (streamingHours / totalStreams).toFixed(1) : 0;

  // Funciones para manejar el stream
  const [isStartingStream, setIsStartingStream] = useState(false);

  const handleStartStream = () => {
    if (streamConfig) {
      // Si ya hay configuración, ir directamente al overlay
      navigate('/stream-overlay', { state: streamConfig });
    } else {
      // Si no hay configuración, abrir modal primero
      setIsStartingStream(true);
      setIsConfigModalOpen(true);
    }
  };

  const handleConfigureStream = () => {
    setIsStartingStream(false);
    setIsConfigModalOpen(true);
  };

  const handleSaveConfig = (config, shouldStartStream = false) => {
    setStreamConfig(config);
    // Opcional: guardar en localStorage o enviar al servidor
    localStorage.setItem('streamConfig', JSON.stringify(config));
    
    // Si viene del botón "Iniciar Stream", redirigir automáticamente
    if (shouldStartStream) {
      navigate('/stream-overlay', { state: config });
    }
  };

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
                  <div className="stat-number">{streamingHours}</div>
                  <div className="stat-title">Horas Totales</div>
                  <div className="stat-subtitle">de transmisión</div>
                </div>
              </div>

              <div className="stat-card secondary">
                <div className="stat-icon">📺</div>
                <div className="stat-content">
                  <div className="stat-number">{totalStreams}</div>
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
                    {user.gems?.toLocaleString() || 0}
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

            {user.role === "streamer" && streamConfig && (
              <div className="dashboard-section">
                <h3>Configuración de Stream Actual</h3>
                <div className="stream-config-preview">
                  <div className="config-item">
                    <strong>Título:</strong> {streamConfig.title}
                  </div>
                  <div className="config-item">
                    <strong>Categoría:</strong> {streamConfig.category}
                  </div>
                  <div className="config-item">
                    <strong>Calidad:</strong> {streamConfig.quality} - {streamConfig.bitrate} kbps
                  </div>
                </div>
              </div>
            )}

            <div className="dashboard-section">
              <h3>Acciones Rápidas</h3>
              <div className="quick-actions">
                {user.role === "streamer" ? (
                  <div className="actions-grid">
                    <button 
                      className="action-button primary"
                      onClick={handleStartStream}
                    >
                      <span className="action-icon">🎥</span>
                      {streamConfig ? 'Iniciar Stream' : 'Configurar e Iniciar'}
                    </button>
                    <button 
                      className="action-button secondary"
                      onClick={handleConfigureStream}
                    >
                      <span className="action-icon">⚙️</span>
                      {streamConfig ? 'Editar Configuración' : 'Configurar Stream'}
                    </button>
                    <Link 
                      to="/mi-tienda" 
                      className="action-button store"
                    >
                      <span className="action-icon">🛒</span>
                      Mi Tienda
                    </Link>
                    <Link 
                      to="/profile" 
                      className="action-button tertiary"
                    >
                      <span className="action-icon">👤</span>
                      Ver Perfil
                    </Link>
                  </div>
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

      {/* Modal de Configuración */}
      <StreamConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => {
          setIsConfigModalOpen(false);
          setIsStartingStream(false);
        }}
        onSave={handleSaveConfig}
        startStreamAfterSave={isStartingStream}
      />
    </div>
  );
};

export default Dashboard;
