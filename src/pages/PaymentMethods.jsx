import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './VVCoin.css';

const PaymentMethods = () => {
  const { state } = useLocation();
  const [selected, setSelected] = useState(null);

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Función para manejar el envío del formulario
  const handleCardSubmit = (e) => {
    e.preventDefault();
    alert(`Pagaste con tarjeta ${cardNumber}`);
  };

  return (
    <div className="payment-container">
      <h1 style={{ textAlign: 'center' }}>Método de Pago</h1>
      <p>Selecciona cómo deseas pagar por <strong>{state?.price}</strong></p>

      <div className="payment-options">
        <div className={`payment-card ${selected === 'yape' ? 'selected' : ''}`} onClick={() => setSelected('yape')}>
          <img src="/images/Yape.jpg" alt="Yape" />
          <div><span>Yape</span></div>
        </div>
        <div className={`payment-card ${selected === 'tarjeta' ? 'selected' : ''}`} onClick={() => setSelected('tarjeta')}>
          <img src="/images/Otro.jpg" alt="Tarjeta" />
          <div><span>Tarjeta</span></div>
        </div>
      </div>

      {selected === 'yape' && (
        <div className="qr-container">
          <h3>Escanea el QR para pagar</h3>
          <img src="/images/qr.jpg" alt="QR Yape" />
        </div>
      )}

      {selected === 'tarjeta' && (
        <form className="tarjeta-form" onSubmit={handleCardSubmit}>
          <h3>Ingresa tu tarjeta 💳</h3>

          <input
            type="text"
            placeholder="Número de tarjeta"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <input
              type="text"
              placeholder="MM/AA"
              maxLength={5}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              maxLength={3}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
        <button type="submit" className="tarjeta-boton">
          Pagar
        </button>
        </form>
      )}
    </div>
  );
};

export default PaymentMethods;
