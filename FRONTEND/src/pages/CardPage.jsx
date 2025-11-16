import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VVCoin.css";

export default function VVCoin() {
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);

  // Estados de la tarjeta
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayClick = () => {
    setShowCard(true); // muestra la tarjeta
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  // Prepara los datos (puedes ajustar según tu modelo)
  const data = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    profilePicture: formData.profilePicture,
    role: formData.role
  };

  const result = await registerUser(data);

  if (result.id) {
    // Registro exitoso, redirige según el rol
    if (formData.role === 'streamer') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  } else {
    setError(result.error || 'Error al registrar');
  }

  setLoading(false);
};

  return (
    <div className="vvcoins-container">
      <h1 className="vvcoins-title">VVCoin</h1>

      <div className="payment-options">
        <div
          className="payment-card"
          onClick={handlePayClick}
        >
          <p>Pagar con tarjeta</p>
          <img src="/tarjeta-icon.png" alt="Tarjeta" />
        </div>
        {/* Aquí podrías agregar más métodos de pago */}
      </div>

      {showCard && (
        <form onSubmit={handleSubmit} className="tarjeta-form">
          <div className="tarjeta-placeholder">
            <h2>Ingresa tu tarjeta</h2>

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

            <button type="submit" style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "10px",
              background: "var(--twitch-accent)",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}>
              Pagar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
