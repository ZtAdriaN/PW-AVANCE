import React, { useEffect, useState } from 'react';
import './AnimationOverlay2.css';

const AnimationOverlay = ({ donation }) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    
    speakDonation(donation.amount, donation.fromUser);

    // Ocultar después de 4 segundos
    const timer = setTimeout(() => setShowNotification(false), 4000);
    return () => clearTimeout(timer);
  }, [donation]);

  const speakDonation = (amount, donorName) => {
    if ('speechSynthesis' in window) {
      // Cancelar cualquier voz anterior
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance();
      
      // Configurar el mensaje de voz
      let voiceMessage = '';
      
      if (amount >= 500) {
        voiceMessage = `¡Wow! ${donorName} ha donado ${amount} gemas. ¡Increíble!`;
      } else if (amount >= 100) {
        voiceMessage = `¡Gran donación! ${donorName} donó ${amount} gemas.`;
      } else {
        voiceMessage = `${donorName} donó ${amount} gemas.`;
      }

      utterance.text = voiceMessage;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      // Intentar usar una voz en español si está disponible
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => 
        voice.lang.includes('es') || voice.lang.includes('ES')
      );
      
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="animation-overlay">
      {/* Notificación simple */}
      {showNotification && (
        <div className="donation-notification">
          <div className="notification-content">
            <div className="donation-header">
              <span className="donation-emoji">💎</span>
              <h2 className="donation-title">¡Donación Recibida!</h2>
              <span className="donation-emoji">💎</span>
            </div>
            
            <div className="donation-details">
              <div className="donor-info">
                <span className="donor-name">{donation.fromUser}</span>
                {donation.isAnonymous && <span className="anonymous-badge">🥷</span>}
              </div>
              
              <div className="amount-display">
                <span className="amount">{donation.amount}</span>
                <span className="gems-text">gemas</span>
              </div>

              {donation.message && (
                <div className="message-display">
                  "{donation.message}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationOverlay;