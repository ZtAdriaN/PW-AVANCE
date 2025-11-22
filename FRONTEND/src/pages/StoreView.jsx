import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api";
import "./Tienda.css";

const StoreView = () => {
  const { streamerId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setItems(products);
    }
    fetchProducts();
  }, []);

  const handleBuy = (item) => {
    alert(`Compraste: ${item.name} y ganaste ${item.points} puntos`);
    // Aquí se integrará con el saldo del usuario
  };

  return (
    <div className="store-container">
      <h1 className="store-title">Tienda del Streamer</h1>

      {items.length === 0 ? (
        <p className="store-empty">Este streamer aún no tiene productos.</p>
      ) : (
        <div className="store-items">
          {items.map((item) => (
            <div key={item.id} className="store-item-card">
              <h3>{item.name}</h3>
              <p>💰 {item.price} coins</p>
              <p>⭐ {item.points} pts</p>
              <button
                onClick={() => handleBuy(item)}
                className="store-item-buy"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreView;
