import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = React.useState(0);
  
  // Forzar re-render cuando cambie el nivel del usuario
  React.useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [user?.level, user?.points, user?.gems, user?.totalStreams, user?.streamingHours]);
  
  // Verificar si hay actualizaciones en localStorage
  React.useEffect(() => {
    const checkForUpdates = () => {
      if (user?.id) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.id === user.id) {
          // Si el localStorage tiene datos más recientes, forzar actualización
          if (currentUser.level !== user.level || 
              currentUser.points !== user.points || 
              currentUser.gems !== user.gems ||
              currentUser.totalStreams !== user.totalStreams ||
              currentUser.streamingHours !== user.streamingHours) {
            setRefreshKey(prev => prev + 1);
          }
        }
      }
    };

    const interval = setInterval(checkForUpdates, 1000); // Verificar cada segundo
    return () => clearInterval(interval);
  }, [user]);
  
  const localStreams = user?.totalStreams || 0;
  const localHours = user?.streamingHours || 0;

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

  // Obtener los datos más actualizados (localStorage puede tener datos más recientes)
  const getCurrentUserData = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.id === user.id) {
        // Usar datos del localStorage si están más actualizados
        return {
          ...user,
          level: Math.max(user.level || 1, currentUser.level || 1),
          points: currentUser.points !== undefined ? currentUser.points : user.points,
          pointsToNextLevel: currentUser.pointsToNextLevel || user.pointsToNextLevel,
          gems: currentUser.gems !== undefined ? currentUser.gems : user.gems,
          totalStreams: Math.max(user.totalStreams || 0, currentUser.totalStreams || 0),
          streamingHours: Math.max(user.streamingHours || 0, currentUser.streamingHours || 0)
        };
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
    return user;
  };

  const currentUserData = getCurrentUserData();
  const progressPercentage = (currentUserData.points / currentUserData.pointsToNextLevel) * 100;
  const displayLevel = currentUserData.level;

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
                  <span className="gems-count">{currentUserData.gems.toLocaleString()}</span>
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
                      {currentUserData.points} / {currentUserData.pointsToNextLevel} puntos
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Estadísticas</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{currentUserData.totalStreams}</div>
                  <div className="stat-label">Streams Realizados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{currentUserData.streamingHours}h</div>
                  <div className="stat-label">Horas Transmitidas</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{displayLevel}</div>
                  <div className="stat-label">Nivel Actual</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{currentUserData.gems.toLocaleString()}</div>
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