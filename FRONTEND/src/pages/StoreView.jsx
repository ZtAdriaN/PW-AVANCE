import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts, purchaseItem } from "../api";
import { useAuth } from "../contexts/AuthContext";
import "./Tienda.css";

const StoreView = () => {
  const { streamerId } = useParams();
  const [items, setItems] = useState([]);
  const { user, setUser } = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setItems(products);
    }
    fetchProducts();
  }, []);

  const handleBuy = async (item) => {
    if (!user) return alert("No hay usuario logueado");
    const result = await purchaseItem(user.id, item.id);
    const updatedUser = { ...user, gems: Number(result.gems) };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    alert(`Compraste: ${item.name}. Nuevo saldo: ${updatedUser.gems} 💎`);
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
