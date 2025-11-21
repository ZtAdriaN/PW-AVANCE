import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserOrStreamerById, getUserOrStreamerByName } from "../api";
import StreamConfigModal from "../components/StreamConfigModal";

const Dashboard = () => {
  const { user, setUser } = useAuth();
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

  const averageStreamDuration =
    user.totalStreams > 0
      ? Math.floor(Number(user.streamingHours || 0) / Number(user.totalStreams || 1))
      : 0;

  // Funciones para manejar el stream
  const [isStartingStream, setIsStartingStream] = useState(false);

  useEffect(() => {
    let interval;
    if (user?.name) {
      const refresh = async () => {
        try {
          const data = await getUserOrStreamerByName(user.name);
          if (data && (data.streamingHours !== undefined || data.level !== undefined || data.points !== undefined)) {
            setUser(prev => ({
              ...prev,
              streamingHours: Number(data.streamingHours ?? prev.streamingHours ?? 0),
              level: Number(data.level ?? prev.level ?? 1),
              points: Number(data.points ?? prev.points ?? 0),
              pointsToNextLevel: Number(data.pointsToNextLevel ?? prev.pointsToNextLevel ?? 100)
            }));
          }
        } catch {}
      };
      refresh();
      interval = setInterval(refresh, 10000);
    }
    return () => interval && clearInterval(interval);
  }, [user?.name]);

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
                  src={user.profilePicture ? `http://localhost:3000${user.profilePicture}` : '/src/assets/default-avatar.svg'}
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
                  <div className="stat-number">{Math.floor(Number(user.streamingHours || 0))}</div>
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
              <h3>Progreso de Nivel</h3>
              <div className="progress-summary">
                <div className="progress-item">
                  <span className="progress-label">Nivel actual:</span>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${Math.min(100, Math.floor((Number(user.points || 0) / Number(user.pointsToNextLevel || 100)) * 100))}%` }}
                      ></div>
                    </div>
                    <span className="progress-percentage">{Math.min(100, Math.floor((Number(user.points || 0) / Number(user.pointsToNextLevel || 100)) * 100))}%</span>
                  </div>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Puntos:</span>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "100%" }}></div>
                    </div>
                    <span className="progress-percentage">{Number(user.points || 0)} / {Number(user.pointsToNextLevel || 100)}</span>
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
                  <>
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
