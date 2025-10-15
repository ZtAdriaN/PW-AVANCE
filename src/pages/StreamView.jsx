import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DonationPanel from '../components/DonationPanel';
import AnimationOverlay from '../components/AnimationOverlay';
import DonationHistory from '../components/DonationHistory';

const StreamView = () => {
  const { id } = useParams();
  const { user, addPoints } = useAuth();
  const [stream, setStream] = useState(null);
  const [donations, setDonations] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Datos de ejemplo para el stream
  useEffect(() => {
    const streamsData = {
      1: {
        id: 1,
        title: 'DIRECTO LIBRE RETOS DEL CHAT... 🔥',
        streamer: 'peoplelite',
        category: 'Fortnite',
        viewers: 38,
        thumbnail: 'https://images.kick.com/video_thumbnails/yZF8BSxKY2CJ/KtXyGVJzbC6u/360.webp?versionId=.fLNhneVl1qT2_t31x65xn04Q6e_QRi0',
        isLive: true,
        description: '¡Jugando Fortnite con retos del chat! ¡Únete a la diversión!'
      },
      2: {
        id: 2,
        title: 'El don stark 82 estoy en vivo',
        streamer: 'eldonstark82',
        category: 'Valorant',
        viewers: 35,
        thumbnail: 'https://www.vijesti.me/data/images/2024/06/25/18/5576227_2376983_ls.jpg',
        isLive: true,
        description: 'Ranked games en Valorant, tratando de subir a Immortal'
      },
      3: {
        id: 3,
        title: 'COMENZANDO STREAM (necesito una nueva intro xd)',
        streamer: 'bububuenas',
        category: 'Charlando',
        viewers: 57,
        thumbnail: 'https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/ChillyInventiveDogePermaSmug-G4gsG4zNKVQ-o8LB/cab77320-5930-42ba-8fb2-00c5b419e57e/preview.jpg',
        isLive: true,
        description: 'Stream relajado charlando con la comunidad. ¡Vengan a conversar!'
      },
      4: {
        id: 4,
        title: 'MI SUEÑO ES SER MICROBUSERO',
        streamer: 'microbusero',
        category: 'PEAK',
        viewers: 71,
        thumbnail: 'https://pbs.twimg.com/amplify_video_thumb/1950017018645676032/img/1VA4N2d7H62iYgxU.jpg:large',
        isLive: true,
        description: 'Jugando ROBLOX'
      },
      5: {
        id: 5,
        title: 'Gaming session with friends - Come join!',
        streamer: 'nezumivy',
        category: 'DEVOUR',
        viewers: 811,
        thumbnail: 'https://www.clarin.com/2019/12/23/8A9TN1EN_360x240__1.jpg',
        isLive: true,
        description: 'DROPS ON - PLAYIN WITH BROS - COME JOIN'
      },
      6: {
        id: 6,
        title: 'Diego Bertie Challenge',
        streamer: 'gamer_pro',
        category: 'Peak',
        viewers: 234,
        thumbnail: 'https://www.thesaturdaypaper.com.au/sites/default/files/styles/article_large/public/images/review_ss_f157b9fd773acfbb122eaf09e7f008bfd77b02ab.jpg?itok=lQ9fxiY1',
        isLive: true,
        description: 'Alalau'
      }
    };

    const currentStream = streamsData[id] || streamsData[1];
    setStream(currentStream);

    // Mensajes de chat personalizados por stream
    const chatMessagesData = {
      1: [ // peoplelite 
        { id: 1, user: 'FortniteKing', message: '¡Vamos por la Victory Royale!', timestamp: Date.now() - 45000 },
        { id: 2, user: 'BuildMaster', message: 'Esa construcción estuvo épica 🔥', timestamp: Date.now() - 30000 },
        { id: 3, user: 'ChatFan', message: 'Reto: solo usar escopeta esta partida', timestamp: Date.now() - 20000 },
        { id: 4, user: 'PeopleFan1', message: 'peoplelite el mejor streamer!', timestamp: Date.now() - 15000 },
      ],
      2: [ // eldonstark82 
        { id: 1, user: 'ValorantPro', message: 'Ace incoming!', timestamp: Date.now() - 40000 },
        { id: 2, user: 'TacticalViewer', message: 'Usa el smoke ahí', timestamp: Date.now() - 35000 },
        { id: 3, user: 'RankedGamer', message: '¿En qué rank estás?', timestamp: Date.now() - 25000 },
        { id: 4, user: 'StarkFan', message: 'Don Stark nunca falla', timestamp: Date.now() - 18000 },
      ],
      3: [ // bububuenas 
        { id: 1, user: 'ChatLover', message: 'Buenas bubu! ¿Cómo estás?', timestamp: Date.now() - 50000 },
        { id: 2, user: 'CommunityMember', message: 'Cuenta alguna anécdota divertida', timestamp: Date.now() - 35000 },
        { id: 3, user: 'RegularViewer', message: '¿Ya decidiste sobre la nueva intro?', timestamp: Date.now() - 22000 },
        { id: 4, user: 'ChillVibes', message: 'Este stream es súper relajante', timestamp: Date.now() - 12000 },
      ],
      4: [ // microbusero 
        { id: 1, user: 'MicrobusLover', message: 'JAJAJA el sueño microbusero', timestamp: Date.now() - 42000 },
        { id: 2, user: 'RobloxFan', message: 'Ese juego de Roblox está buenísimo', timestamp: Date.now() - 28000 },
        { id: 3, user: 'TransporteFan', message: '¿Ya manejaste microbús real?', timestamp: Date.now() - 20000 },
        { id: 4, user: 'ComedyViewer', message: 'Tus historias me matan de risa 😂', timestamp: Date.now() - 16000 },
      ],
      5: [ // nezumivy 
        { id: 1, user: 'HorrorFan', message: 'DROPS ON! Gracias nezu!', timestamp: Date.now() - 38000 },
        { id: 2, user: 'ScaredViewer', message: 'No mires atrás... 👻', timestamp: Date.now() - 32000 },
        { id: 3, user: 'BroGamer', message: 'Playing with the bros! 🎮', timestamp: Date.now() - 24000 },
        { id: 4, user: 'JumpscareVictim', message: 'Casi me da un infarto con ese susto', timestamp: Date.now() - 14000 },
      ],
      6: [ // gamer_pro 
        { id: 1, user: 'BertieFan', message: 'Por Diego Bertie! ⭐', timestamp: Date.now() - 44000 },
        { id: 2, user: 'ChallengeFan', message: 'xd', timestamp: Date.now() - 30000 },
        { id: 3, user: 'ProGamer', message: 'Gamer_pro siempre dando lo mejor', timestamp: Date.now() - 26000 },
        { id: 4, user: 'MemorialViewer', message: 'Alalau! ere frio mano', timestamp: Date.now() - 18000 },
      ]
    };

    const initialMessages = chatMessagesData[currentStream.id] || chatMessagesData[1];
    setChatMessages(initialMessages);

    // Donaciones de ejemplo
    const initialDonations = [
      { 
        id: 1, 
        fromUser: 'GenerousViewer', 
        amount: 100, 
        message: '¡Increíble jugada!', 
        timestamp: Date.now() - 15000,
        isAnonymous: false
      },
      { 
        id: 2, 
        fromUser: 'Anonymous', 
        amount: 50, 
        message: 'Sigue así', 
        timestamp: Date.now() - 10000,
        isAnonymous: true
      }
    ];
    setDonations(initialDonations);
  }, [id]);

  const handleDonation = (amount, message, isAnonymous) => {
    if (!user) return;

    const newDonation = {
      id: donations.length + 1,
      fromUser: isAnonymous ? 'Usuario Anónimo' : user.username,
      amount: amount,
      message: message || '¡Sigue así!',
      timestamp: Date.now(),
      isAnonymous: isAnonymous
    };

    setDonations(prev => [newDonation, ...prev]);
    setLastDonation(newDonation);
    setShowAnimation(true);

    try {
      const pointsEarned = Math.floor(amount / 5);
      if (pointsEarned > 0) {
        addPoints(pointsEarned, 'donation');
      }
    } catch (e) {
      console.error('Error al asignar puntos por donación:', e);
    }

    // Agregar mensaje al chat
    const chatMessage = {
      id: chatMessages.length + 1,
      user: 'Sistema',
      message: `💎 ${newDonation.fromUser} ha donado ${amount} gemas!`,
      timestamp: Date.now(),
      isSystem: true
    };
    setChatMessages(prev => [...prev, chatMessage]);

    // Ocultar animación después de 3 segundos
    setTimeout(() => setShowAnimation(false), 3000);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message = {
      id: chatMessages.length + 1,
      user: user.username,
      message: newMessage,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    try {
      addPoints(1, 'message');
    } catch (e) {
      console.error('Error al asignar exp por mensaje:', e);
    }
  };

  if (!stream) {
    return (
      <div className="main-content">
        <div className="content">
          <div className="stream-loading">
            <h2>Cargando stream...</h2>
            <Link to="/" className="back-button">Volver al inicio</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="content">
        <div className="stream-container">
          {/* Video Player Area */}
          <div className="stream-player-section">
            <div className="stream-player">
              <img src={stream.thumbnail} alt={stream.title} className="stream-video" />
              {stream.isLive && <div className="live-indicator">🔴 EN DIRECTO</div>}
              <div className="viewer-count">{stream.viewers} espectadores</div>
            </div>
            
            <div className="stream-info-section">
              <h1 className="stream-title">{stream.title}</h1>
              <div className="stream-meta">
                <span className="streamer-name">🎥 {stream.streamer}</span>
                <span className="stream-category">📂 {stream.category}</span>
              </div>
              <p className="stream-description">{stream.description}</p>
            </div>

            {/* Donation History */}
            <DonationHistory donations={donations} />
          </div>

          {/* Chat and Donation Panel */}
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

            {/* Donation Panel */}
            {user && (
              <DonationPanel 
                onDonate={handleDonation} 
                userGems={user.gems}
                streamerName={stream.streamer}
              />
            )}
          </div>
        </div>

        {/* Animation Overlay */}
        {showAnimation && lastDonation && (
          <AnimationOverlay donation={lastDonation} />
        )}

        {/* Back Button */}
        <div className="back-button-container">
          <Link to="/" className="back-button">
            Volver a Streams
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StreamView;