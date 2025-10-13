import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VVCoin.css';

const VVCoins = () => {
  const navigate = useNavigate();

  const packs = [
    { price: 'S/ 749.90', coins: '24.000💎', bonus: '1500💎 más' },
    { price: 'S/ 379.90', coins: '11.000💎', bonus: '1000💎 más' },
    { price: 'S/ 189.90', coins: '5250💎', bonus: '750💎 más' },
    { price: 'S/ 74.90', coins: '2000💎', bonus: '300💎 más' },
    { price: 'S/ 37.90', coins: '1000💎', bonus: '200💎 más' },
    { price: 'S/ 17.90', coins: '500💎', bonus: '100💎 más' },
    { price: 'S/ 10.90', coins: '100💎', bonus: 'No hay bonus' },
  ];

  const handleSelect = (pack) => {
    navigate('/payment', { state: pack });
  };

  return (
    <div className="vvcoins-container">
      <h1 className="vvcoins-title" style={{ textAlign: 'center' }}>Comprar 💎</h1>
      <div>
        <h2>PRECIOS</h2>
      </div>
      <div className="vvcoins-table">
        {packs.map((p, i) => (
          <div key={i} className="vvcoins-row" onClick={() => handleSelect(p)}>
            <span className="vvcoins-price">{p.price}</span>
            <span className="vvcoins-coins">{p.coins}</span>
            <span className="vvcoins-bonus">{p.bonus}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VVCoins;
