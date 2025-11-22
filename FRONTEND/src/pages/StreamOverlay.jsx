import React, { useState, useEffect, useRef } from "react";
import { getUserProfile, addChatPoint } from '../api';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DonationPanel from "../components/DonationPanel";
import DonationHistory from "../components/DonationHistory";
import AnimationOverlay from "../components/AnimationOverlay2";
import "./StreamOverlay.css";
import LevelUpToast from "../components/LevelUpToast";
import { createStreamByName, finishStreamByName, updateUserLevel } from '../api';

const StreamOverlay = () => {
  const { user, setUser } = useAuth();
  // Recargar usuario SIEMPRE al entrar a la página del chat
  useEffect(() => {
    if (user && user.id) {
      getUserProfile(user.id).then(data => {
        if (data && data.name) {
          setUser({ ...user, name: data.name });
        }
      });
    }
  }, [user?.id]);
  const location = useLocation();
  const navigate = useNavigate();
  

  const [showAnimation, setShowAnimation] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  
  // Datos del stream de la configuración
  const streamConfig = location.state || {
    title: "Stream sin título",
    description: "Sin descripción",
    category: "Sin categoría"
  };

  // Estados del stream
  const [isLive, setIsLive] = useState(false);
  const [streamDuration, setStreamDuration] = useState(0); // segundos reales
  const [simulatedHours, setSimulatedHours] = useState(0); // horas simuladas
  const [level, setLevel] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevelRef = useRef(0);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Usuario1", message: "¡Hola! ¿Cómo estás?", timestamp: Date.now() - 45000 },
    { id: 2, user: "Usuario2", message: "¡Excelente stream!", timestamp: Date.now() - 30000 },
    { id: 3, user: "Usuario3", message: "¿Qué juego vas a jugar?", timestamp: Date.now() - 20000 }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [donations, setDonations] = useState([
    { 
      id: 1, 
      fromUser: "Donador1", 
      amount: 50, 
      message: "¡Sigue así!", 
      timestamp: Date.now() - 15000,
      isAnonymous: false
    },
    { 
      id: 2, 
      fromUser: "Donador2", 
      amount: 25, 
      message: "Para café ☕", 
      timestamp: Date.now() - 10000,
      isAnonymous: false
    }
  ]);

  // Efecto para el contador de tiempo y simulación acelerada
  useEffect(() => {
    let interval;
    let hourInterval;
    let viewerInterval;
    if (isLive) {
      // Contador de segundos reales
      interval = setInterval(() => {
        setStreamDuration(prev => prev + 1);
      }, 1000);

      // Simulación: cada 10 segundos reales suma 1 hora simulada
      hourInterval = setInterval(() => {
        setSimulatedHours(prev => prev + 1);
      }, 10000); // 10000 ms = 10 seg real

      // Simular viewers fluctuando
      viewerInterval = setInterval(() => {
        setViewerCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      }, 5000);

      return () => {
        clearInterval(interval);
        clearInterval(hourInterval);
        clearInterval(viewerInterval);
      };
    }
    return () => {
      clearInterval(interval);
      clearInterval(hourInterval);
      clearInterval(viewerInterval);
    };
  }, [isLive]);

  // Efecto para calcular nivel y mostrar notificación al subir de nivel
  useEffect(() => {
    // Subir de nivel por cada hora simulada
    if (simulatedHours > prevLevelRef.current) {
      setLevel(lvl => {
        const nextLevel = lvl + 1;
        setShowLevelUp(true);
        if (user?.id) {
          localStorage.setItem(`level_${user.id}`, nextLevel);
          // Actualizar nivel en la base de datos
          updateUserLevel(user.name, nextLevel);
        }
        setTimeout(() => setShowLevelUp(false), 3000);
        return nextLevel;
      });
      prevLevelRef.current = simulatedHours;
    }
  }, [simulatedHours, user]);

  // Estado para puntos
  const [points, setPoints] = useState(0);

  // Formatear tiempo
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Iniciar/Detener stream
  const toggleStream = async () => {
    if (!isLive) {
      // Iniciar stream en backend
      try {
        const result = await createStreamByName({
          name: user?.name,
          title: streamConfig.title,
          description: streamConfig.description,
          config: streamConfig
        });
        console.log('Respuesta backend (crear stream):', result);
      } catch (err) {
        console.error('Error al iniciar stream:', err);
      }
      setIsLive(true);
      setViewerCount(Math.floor(Math.random() * 10) + 1);
      setStreamDuration(0);
      // Leer nivel guardado en localStorage
      setSimulatedHours(0);
      setLevel(user?.level || 1);
      prevLevelRef.current = 0;

      // Mensaje del sistema
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        user: "Sistema",
        message: "🎥 Stream iniciado. ¡Bienvenidos!",
        timestamp: Date.now(),
        isSystem: true
      }]);
    } else {
      // Finalizar stream en backend
      try {
        const result = await finishStreamByName({
          name: user?.name,
          simulatedHours
        });
        console.log('Respuesta backend (finalizar stream):', result);
      } catch (err) {
        console.error('Error al finalizar stream:', err);
      }
      setIsLive(false);
      setViewerCount(0);
      // No reiniciar simulatedHours ni level al apagar stream
      // prevLevelRef.current se mantiene

      // Mensaje del sistema
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        user: "Sistema",
        message: "📴 Stream finalizado. ¡Gracias por acompañarnos!",
        timestamp: Date.now(),
        isSystem: true
      }]);
    }
  };

  // Enviar mensaje al chat
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`store_${user.id}`);
      setStoreItems(stored ? JSON.parse(stored) : []);
    }
  }, [user?.id]);

  const handleChatSubmit = (e) => {
    console.log('Valor de user en frontend:', user);
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message = {
      id: Date.now(),
      user: user.name,
      message: newMessage.trim(),
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Enviar mensaje y streamId al backend para sumar punto y guardar mensaje
    const streamId = streamConfig.id || 1; // Ajusta según tu lógica de stream actual
    addChatPoint(user.id, newMessage.trim(), streamId)
      .then(result => {
        if (result && result.success) {
          getUserProfile(user.id).then(data => {
            if (data) {
              setUser(data);
            }
          });
        }
      })
      .catch(err => {
        console.error('Error al sumar punto por chat:', err);
      });
  };


  const handleDonation = (amount, message, isAnonymous) => {
    if (!user) return;

    const newDonation = {
      id: Date.now(),
      fromUser: isAnonymous ? 'Usuario Anónimo' : user.username,
      amount: amount,
      message: message || '¡Sigue así!',
      timestamp: Date.now(),
      isAnonymous: isAnonymous
    };

    setDonations(prev => [newDonation, ...prev]);

    
    setShowAnimation(true);
    setLastDonation(newDonation);
    
    // Ocultar animación después de 3 segundos
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    // Siempre agregar mensaje al chat
    const chatMessage = {
      id: Date.now() + 1,
      user: 'Sistema',
      message: `💎 ${newDonation.fromUser} ha donado ${amount} gemas!`,
      timestamp: Date.now(),
      isSystem: true
    };
    setChatMessages(prev => [...prev, chatMessage]);
  };

  return (
    <div className="main-content">
      {/* Notificación de subida de nivel */}
      {showLevelUp && <LevelUpToast level={level} />}
      <div className="content">
        {/* Header con controles del stream */}
        <div className="stream-overlay-header">
          <div className="stream-info">
            <div className="stream-status">
              <span className={`live-indicator ${isLive ? 'live' : 'offline'}`}>
                {isLive ? '🔴 EN DIRECTO' : '⚪ DESCONECTADO'}
              </span>
              {isLive && (
                <div className="stream-stats">
                  <span className="viewer-count">{viewerCount} espectadores</span>
                  <span className="stream-time">⏰ {formatTime(streamDuration)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="stream-controls">
            <button 
              className={`stream-toggle ${isLive ? 'stop' : 'start'}`}
              onClick={toggleStream}
            >
              {isLive ? '⏹️ Finalizar Stream' : '▶️ Iniciar Stream'}
            </button>
            <button 
              className="back-button"
              onClick={() => navigate('/dashboard')}
            >
              🏠 Dashboard
            </button>
          </div>
        </div>

        {/* Layout principal similar a StreamView */}
        <div className="stream-container">
          {/* Sección del player y info */}
          <div className="stream-player-section">
            {/* Video Player Area */}
            <div className="stream-player">
              {isLive ? (
                <div className="live-video">
                  <div className="video-overlay">
                    <h2>🎥 Transmisión en Vivo</h2>
                    <p>Conecta tu software de streaming (OBS, Streamlabs, etc.)</p>
                    <div className="stream-key-info">
                      <small>Stream Key: ****-****-****-{user?.id || '1234'}</small>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="offline-video">
                  <h3>📴 Stream Desconectado</h3>
                  <p>Haz clic en "Iniciar Stream" para comenzar</p>
                </div>
              )}
              {isLive && <div className="live-indicator">🔴 EN DIRECTO</div>}
              {isLive && <div className="viewer-count">{viewerCount} espectadores</div>}
            </div>
            
            {/* Información del stream */}
            <div className="stream-info-section">
              <h1 className="stream-title">{streamConfig.title}</h1>
              <div className="stream-meta">
                <span className="streamer-name">🎥 {user?.username || 'Streamer'}</span>
                <span className="stream-category">📂 {streamConfig.category}</span>
              </div>
              <p className="stream-description">{streamConfig.description}</p>
            </div>

            {/* Historial de donaciones */}
            <DonationHistory donations={donations} />
          </div>

          {/* Sidebar con chat y donaciones */}
          <div className="stream-sidebar">
            {/* Chat Section */}
            <div className="chat-section">
              <div className="chat-header">
                <h3>💬 Chat del Stream</h3>
              </div>
              <div className="chat-messages">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`chat-message ${msg.isSystem ? 'system-message' : ''}`}>
                    <span className="chat-user">{msg.user}:</span>
                    <span className="chat-text">{msg.message}</span>
                  </div>
                ))}
              </div>
              {user && (
                <form onSubmit={handleChatSubmit} className="chat-input-form">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="chat-input"
                  />
                  <button type="submit" className="chat-send-btn">Enviar</button>
                </form>
              )}
            </div>

            {/* Panel de donaciones */}
            {user && (
              <DonationPanel 
                onDonate={handleDonation} 
                userGems={user.gems || 0}
                streamerName={user.username || 'Streamer'}
              />
            )}
              
            {/* Recompensas de Mi Tienda */}
            <div className="store-items-overlay">
              <h3 className="store-overlay-title">🎁 Recompensas del Streamer</h3>
              {storeItems.length === 0 ? (
                <p className="store-empty">No hay recompensas disponibles</p>
              ) : (
                <div className="store-items-list">
                  {storeItems.map(item => (
                    <div key={item.id} className="store-item-card-overlay">
                      <h4>{item.name}</h4>
                      <p>💰 {item.price} coins</p>
                      <p>⭐ {item.points} pts</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botón de regreso */}
        <div className="back-button-container">
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
          >
            Volver al Dashboard
          </button>
        </div>

      
        {showAnimation && lastDonation && (
          <AnimationOverlay donation={lastDonation} />
        )}
      </div>
    </div>
  );
};

export default StreamOverlay;