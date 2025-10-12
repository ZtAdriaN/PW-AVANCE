import React, { useEffect, useState } from 'react';

const AnimationOverlay = ({ donation }) => {
  const [particles, setParticles] = useState([]);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Crear partículas basadas en la cantidad de la donación
    const particleCount = Math.min(donation.amount / 10, 50); // Máximo 50 partículas
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 2,
        size: Math.random() * 20 + 15, // Entre 15px y 35px
        rotation: Math.random() * 360
      });
    }

    setParticles(newParticles);

    // Reproducir sonido basado en la cantidad
    playDonationSound(donation.amount);

    // Ocultar notificación después de 3 segundos
    const timer = setTimeout(() => setShowNotification(false), 3000);
    return () => clearTimeout(timer);
  }, [donation]);

  const playDonationSound = (amount) => {
    // Simular diferentes sonidos para diferentes cantidades
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      let frequency = 440; // Nota base (A4)
      if (amount >= 500) frequency = 880; // Octava más alta
      else if (amount >= 200) frequency = 660; // Entre medio
      else if (amount >= 100) frequency = 550; // Un poco más alto
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio no disponible:', error);
    }
  };

  const getDonationLevel = () => {
    if (donation.amount >= 500) return 'mega';
    if (donation.amount >= 200) return 'super';
    if (donation.amount >= 100) return 'big';
    if (donation.amount >= 50) return 'medium';
    return 'small';
  };

  const getDonationEmoji = () => {
    if (donation.amount >= 500) return '🎆';
    if (donation.amount >= 200) return '⭐';
    if (donation.amount >= 100) return '✨';
    if (donation.amount >= 50) return '💫';
    return '💎';
  };

  return (
    <div className="animation-overlay">
      {/* Gems Rain Animation */}
      <div className="gems-rain">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="gem-particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              fontSize: `${particle.size}px`,
              transform: `rotate(${particle.rotation}deg)`
            }}
          >
            💎
          </div>
        ))}
      </div>

      {/* Donation Notification */}
      {showNotification && (
        <div className={`donation-notification ${getDonationLevel()}`}>
          <div className="notification-content">
            <div className="donation-emoji">{getDonationEmoji()}</div>
            <div className="donation-info">
              <div className="donor-name">
                {donation.fromUser} 
                {donation.isAnonymous && <span className="anonymous-badge">🥷</span>}
              </div>
              <div className="donation-amount">{donation.amount} gemas</div>
              {donation.message && (
                <div className="donation-message">"{donation.message}"</div>
              )}
            </div>
          </div>
          <div className="notification-glow"></div>
        </div>
      )}

      {/* Screen Flash Effect for large donations */}
      {donation.amount >= 200 && (
        <div className="screen-flash"></div>
      )}

      {/* Fireworks for mega donations */}
      {donation.amount >= 500 && (
        <div className="fireworks">
          <div className="firework firework-1">
            <div className="explosion"></div>
          </div>
          <div className="firework firework-2">
            <div className="explosion"></div>
          </div>
          <div className="firework firework-3">
            <div className="explosion"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationOverlay;