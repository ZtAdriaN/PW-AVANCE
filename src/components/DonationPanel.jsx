import React, { useState } from 'react';

const DonationPanel = ({ onDonate, userGems, streamerName }) => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const quickAmounts = [10, 25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setCustomAmount(e.target.value);
    setSelectedAmount(value);
  };

  const getFinalAmount = () => {
    return customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  };

  const canDonate = () => {
    const amount = getFinalAmount();
    return amount > 0 && amount <= userGems;
  };

  const handleDonateClick = () => {
    if (!canDonate()) return;
    setShowConfirmation(true);
  };

  const confirmDonation = () => {
    const amount = getFinalAmount();
    onDonate(amount, message, isAnonymous);
    
    // Reset form
    setSelectedAmount(50);
    setCustomAmount('');
    setMessage('');
    setIsAnonymous(false);
    setShowConfirmation(false);
  };

  const cancelDonation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="donation-panel">
      <div className="donation-header">
        <h3>💎 Donar Gemas</h3>
        <div className="user-gems-display">
          <span className="gems-icon">💎</span>
          <span className="gems-amount">{userGems.toLocaleString()}</span>
          <span className="gems-label">disponibles</span>
        </div>
      </div>

      <div className="donation-content">
        <div className="donation-to">
          <span>Donando a: <strong>{streamerName}</strong></span>
        </div>

        {/* Quick Amount Buttons */}
        <div className="quick-amounts">
          <h4>Cantidad Rápida:</h4>
          <div className="amount-buttons">
            {quickAmounts.map(amount => (
              <button
                key={amount}
                className={`amount-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                onClick={() => handleAmountSelect(amount)}
                disabled={amount > userGems}
              >
                {amount} 💎
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="custom-amount">
          <label htmlFor="customAmount">Cantidad Personalizada:</label>
          <input
            type="number"
            id="customAmount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Ingresa cantidad..."
            min="1"
            max={userGems}
            className="custom-amount-input"
          />
        </div>

        {/* Message */}
        <div className="donation-message">
          <label htmlFor="donationMessage">Mensaje (opcional):</label>
          <textarea
            id="donationMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="¡Sigue así! 🔥"
            maxLength={100}
            className="message-input"
          />
          <small>{message.length}/100 caracteres</small>
        </div>

        {/* Anonymous Option */}
        <div className="anonymous-option">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span className="checkmark"></span>
            Donar de forma anónima
          </label>
        </div>

        {/* Donation Summary */}
        <div className="donation-summary">
          <div className="summary-line">
            <span>Cantidad a donar:</span>
            <span className="amount-highlight">{getFinalAmount()} 💎</span>
          </div>
          <div className="summary-line">
            <span>Gemas restantes:</span>
            <span>{(userGems - getFinalAmount()).toLocaleString()} 💎</span>
          </div>
        </div>

        {/* Donate Button */}
        <button
          className={`donate-button ${canDonate() ? 'enabled' : 'disabled'}`}
          onClick={handleDonateClick}
          disabled={!canDonate()}
        >
          {!canDonate() 
            ? getFinalAmount() > userGems 
              ? 'Gemas Insuficientes' 
              : 'Ingresa una cantidad'
            : `Donar ${getFinalAmount()} 💎`
          }
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="donation-modal-overlay">
          <div className="donation-modal">
            <h3>Confirmar Donación</h3>
            <div className="confirmation-details">
              <p><strong>Para:</strong> {streamerName}</p>
              <p><strong>Cantidad:</strong> {getFinalAmount()} 💎</p>
              {message && <p><strong>Mensaje:</strong> "{message}"</p>}
              <p><strong>Anónimo:</strong> {isAnonymous ? 'Sí' : 'No'}</p>
            </div>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmDonation}>
                ✅ Confirmar Donación
              </button>
              <button className="cancel-btn" onClick={cancelDonation}>
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPanel;